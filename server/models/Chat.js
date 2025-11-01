const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  botId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bot',
    required: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  userInfo: {
    ip: String,
    userAgent: String,
    location: String
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Add message to chat
chatSchema.methods.addMessage = function(role, content) {
  this.messages.push({
    role,
    content,
    timestamp: new Date()
  });
  this.lastActivity = new Date();
  return this.save();
};

// Get conversation context for AI
chatSchema.methods.getContext = function(maxMessages = 10) {
  const recentMessages = this.messages.slice(-maxMessages);
  return recentMessages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));
};

module.exports = mongoose.model('Chat', chatSchema);



