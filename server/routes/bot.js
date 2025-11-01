const express = require('express');
const Bot = require('../models/Bot');
const Chat = require('../models/Chat');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { generateAIResponse } = require('../services/aiService');

const router = express.Router();

// Create a new bot
router.post('/', auth, async (req, res) => {
  try {
    const { name, greeting, personality, defaultResponses } = req.body;

    const bot = new Bot({
      userId: req.userId,
      name,
      greeting,
      personality: personality || {},
      content: {
        defaultResponses: defaultResponses || []
      }
    });

    await bot.save();
    await bot.generatePublicLink();

    res.status(201).json({
      message: 'Bot created successfully',
      bot: {
        id: bot._id,
        name: bot.name,
        greeting: bot.greeting,
        personality: bot.personality,
        settings: bot.settings,
        publicLink: bot.settings.publicLink
      }
    });
  } catch (error) {
    console.error('Create bot error:', error);
    res.status(500).json({ error: 'Server error creating bot' });
  }
});

// Get user's bots
router.get('/', auth, async (req, res) => {
  try {
    const bots = await Bot.find({ userId: req.userId })
      .select('-content.learningSources')
      .sort({ createdAt: -1 });

    res.json({ bots });
  } catch (error) {
    console.error('Get bots error:', error);
    res.status(500).json({ error: 'Server error fetching bots' });
  }
});

// Get specific bot
router.get('/:id', auth, async (req, res) => {
  try {
    const bot = await Bot.findOne({ 
      _id: req.params.id, 
      userId: req.userId 
    });

    if (!bot) {
      return res.status(404).json({ error: 'Bot not found' });
    }

    res.json({ bot });
  } catch (error) {
    console.error('Get bot error:', error);
    res.status(500).json({ error: 'Server error fetching bot' });
  }
});

// Update bot
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, greeting, personality, defaultResponses } = req.body;

    const bot = await Bot.findOne({ 
      _id: req.params.id, 
      userId: req.userId 
    });

    if (!bot) {
      return res.status(404).json({ error: 'Bot not found' });
    }

    bot.name = name || bot.name;
    bot.greeting = greeting || bot.greeting;
    bot.personality = { ...bot.personality, ...personality };
    
    if (defaultResponses) {
      bot.content.defaultResponses = defaultResponses;
    }

    bot.updatedAt = new Date();
    await bot.save();

    res.json({
      message: 'Bot updated successfully',
      bot: {
        id: bot._id,
        name: bot.name,
        greeting: bot.greeting,
        personality: bot.personality,
        settings: bot.settings
      }
    });
  } catch (error) {
    console.error('Update bot error:', error);
    res.status(500).json({ error: 'Server error updating bot' });
  }
});

// Delete bot
router.delete('/:id', auth, async (req, res) => {
  try {
    const bot = await Bot.findOne({ 
      _id: req.params.id, 
      userId: req.userId 
    });

    if (!bot) {
      return res.status(404).json({ error: 'Bot not found' });
    }

    // Delete associated chats
    await Chat.deleteMany({ botId: bot._id });
    
    // Delete bot
    await Bot.findByIdAndDelete(bot._id);

    res.json({ message: 'Bot deleted successfully' });
  } catch (error) {
    console.error('Delete bot error:', error);
    res.status(500).json({ error: 'Server error deleting bot' });
  }
});

// Add learning content
router.post('/:id/learn', auth, async (req, res) => {
  try {
    const { type, url, content } = req.body;

    const bot = await Bot.findOne({ 
      _id: req.params.id, 
      userId: req.userId 
    });

    if (!bot) {
      return res.status(404).json({ error: 'Bot not found' });
    }

    // Check if user has Pro subscription
    const user = await User.findById(req.userId);
    if (user.subscription.plan !== 'pro') {
      return res.status(403).json({ 
        error: 'Learning features require Pro subscription' 
      });
    }

    bot.content.learningSources.push({
      type,
      url,
      content,
      processed: false
    });

    await bot.save();

    res.json({ 
      message: 'Learning content added successfully',
      learningSource: bot.content.learningSources[bot.content.learningSources.length - 1]
    });
  } catch (error) {
    console.error('Add learning content error:', error);
    res.status(500).json({ error: 'Server error adding learning content' });
  }
});

// Chat with bot (public endpoint)
router.post('/chat/:publicLink', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    const publicLink = req.params.publicLink;

    // Find bot by public link
    const bot = await Bot.findOne({ 
      'settings.publicLink': `https://celebify.ai/chat/${publicLink}`,
      'settings.isActive': true
    });

    if (!bot) {
      return res.status(404).json({ error: 'Bot not found' });
    }

    // Check if user can send message (for free plan)
    const user = await User.findById(bot.userId);
    if (!user.canSendMessage()) {
      return res.status(429).json({ 
        error: 'Monthly message limit reached. Upgrade to Pro for unlimited messages.' 
      });
    }

    // Find or create chat session
    let chat = await Chat.findOne({ 
      botId: bot._id, 
      sessionId 
    });

    if (!chat) {
      chat = new Chat({
        botId: bot._id,
        sessionId,
        userInfo: {
          ip: req.ip,
          userAgent: req.get('User-Agent')
        }
      });
    }

    // Add user message
    await chat.addMessage('user', message);

    // Generate AI response
    const context = chat.getContext();
    const aiResponse = await generateAIResponse(bot, context, message);

    // Add AI response
    await chat.addMessage('assistant', aiResponse);

    // Update analytics
    await bot.updateAnalytics(message, !chat.messages.find(m => m.role === 'user'));

    // Update user usage
    user.usage.messagesThisMonth += 1;
    await user.save();

    res.json({
      response: aiResponse,
      sessionId: chat.sessionId,
      watermark: bot.settings.watermark
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Server error processing chat' });
  }
});

// Get bot embed code
router.get('/:id/embed', auth, async (req, res) => {
  try {
    const bot = await Bot.findOne({ 
      _id: req.params.id, 
      userId: req.userId 
    });

    if (!bot) {
      return res.status(404).json({ error: 'Bot not found' });
    }

    const embedCode = `
<div id="celebify-chat-widget" 
     data-bot-id="${bot._id}" 
     data-public-link="${bot.settings.publicLink}"
     style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
  <div id="chat-toggle" style="width: 60px; height: 60px; background: #007bff; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
    💬
  </div>
  <div id="chat-window" style="display: none; width: 350px; height: 500px; background: white; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); position: absolute; bottom: 70px; right: 0;">
    <div style="padding: 15px; border-bottom: 1px solid #eee;">
      <h3 style="margin: 0; font-size: 16px;">${bot.name}</h3>
    </div>
    <div id="chat-messages" style="height: 350px; overflow-y: auto; padding: 15px;">
      <div style="color: #666; font-size: 14px;">${bot.greeting}</div>
    </div>
    <div style="padding: 15px; border-top: 1px solid #eee;">
      <input type="text" id="chat-input" placeholder="Type your message..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; outline: none;">
    </div>
  </div>
</div>
<script>
  // Chat widget functionality would go here
  // This is a simplified version - full implementation would include proper event handling
</script>`;

    res.json({ embedCode });
  } catch (error) {
    console.error('Get embed code error:', error);
    res.status(500).json({ error: 'Server error generating embed code' });
  }
});

module.exports = router;



