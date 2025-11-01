const express = require('express');
const Bot = require('../models/Bot');
const Chat = require('../models/Chat');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get bot analytics
router.get('/bot/:id', auth, async (req, res) => {
  try {
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
        error: 'Analytics require Pro subscription' 
      });
    }

    // Get recent chats
    const recentChats = await Chat.find({ botId: bot._id })
      .sort({ lastActivity: -1 })
      .limit(10)
      .select('sessionId lastActivity messages');

    // Calculate engagement metrics
    const totalChats = await Chat.countDocuments({ botId: bot._id });
    const uniqueSessions = await Chat.distinct('sessionId', { botId: bot._id });
    
    // Get messages from last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentMessages = await Chat.find({
      botId: bot._id,
      lastActivity: { $gte: sevenDaysAgo }
    });

    const analytics = {
      overview: {
        totalMessages: bot.analytics.totalMessages,
        uniqueUsers: bot.analytics.uniqueUsers,
        totalChats,
        uniqueSessions: uniqueSessions.length,
        lastActivity: bot.analytics.lastActivity
      },
      recentActivity: {
        messagesLast7Days: recentMessages.length,
        activeChats: recentChats.length
      },
      topQuestions: bot.analytics.topQuestions,
      recentChats: recentChats.map(chat => ({
        sessionId: chat.sessionId,
        lastActivity: chat.lastActivity,
        messageCount: chat.messages.length
      }))
    };

    res.json({ analytics });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Server error fetching analytics' });
  }
});

// Get user dashboard analytics
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get all user's bots
    const bots = await Bot.find({ userId: req.userId });
    
    // Calculate total metrics
    const totalMessages = bots.reduce((sum, bot) => sum + bot.analytics.totalMessages, 0);
    const totalUniqueUsers = bots.reduce((sum, bot) => sum + bot.analytics.uniqueUsers, 0);
    
    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentChats = await Chat.find({
      botId: { $in: bots.map(bot => bot._id) },
      lastActivity: { $gte: sevenDaysAgo }
    });

    const dashboard = {
      user: {
        name: user.name,
        subscription: user.subscription,
        usage: user.usage
      },
      overview: {
        totalBots: bots.length,
        totalMessages,
        totalUniqueUsers,
        recentActivity: recentChats.length
      },
      bots: bots.map(bot => ({
        id: bot._id,
        name: bot.name,
        totalMessages: bot.analytics.totalMessages,
        uniqueUsers: bot.analytics.uniqueUsers,
        lastActivity: bot.analytics.lastActivity,
        isActive: bot.settings.isActive
      }))
    };

    res.json({ dashboard });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ error: 'Server error fetching dashboard' });
  }
});

// Get chat history for a bot
router.get('/bot/:id/chats', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
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
        error: 'Chat history requires Pro subscription' 
      });
    }

    const chats = await Chat.find({ botId: bot._id })
      .sort({ lastActivity: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('sessionId messages lastActivity userInfo');

    const totalChats = await Chat.countDocuments({ botId: bot._id });

    res.json({
      chats,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(totalChats / limit),
        total: totalChats
      }
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: 'Server error fetching chat history' });
  }
});

module.exports = router;



