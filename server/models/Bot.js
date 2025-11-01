const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  greeting: {
    type: String,
    required: true,
    trim: true
  },
  personality: {
    tone: {
      type: String,
      enum: ['friendly', 'professional', 'casual', 'enthusiastic', 'witty'],
      default: 'friendly'
    },
    style: {
      type: String,
      enum: ['conversational', 'formal', 'playful', 'supportive'],
      default: 'conversational'
    },
    emojis: {
      type: Boolean,
      default: true
    },
    customInstructions: {
      type: String,
      maxlength: 2000
    }
  },
  content: {
    defaultResponses: [{
      question: String,
      answer: String
    }],
    learningSources: [{
      type: {
        type: String,
        enum: ['youtube', 'social', 'website', 'manual'],
        required: true
      },
      url: String,
      content: String,
      processed: {
        type: Boolean,
        default: false
      }
    }]
  },
  settings: {
    watermark: {
      type: Boolean,
      default: true
    },
    publicLink: {
      type: String,
      unique: true,
      sparse: true
    },
    embedCode: String,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  analytics: {
    totalMessages: {
      type: Number,
      default: 0
    },
    uniqueUsers: {
      type: Number,
      default: 0
    },
    topQuestions: [{
      question: String,
      count: Number
    }],
    lastActivity: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate public link
botSchema.methods.generatePublicLink = function() {
  const randomId = Math.random().toString(36).substring(2, 15);
  this.settings.publicLink = `https://celebify.ai/chat/${randomId}`;
  return this.save();
};

// Update analytics
botSchema.methods.updateAnalytics = function(question, isNewUser = false) {
  this.analytics.totalMessages += 1;
  this.analytics.lastActivity = new Date();
  
  if (isNewUser) {
    this.analytics.uniqueUsers += 1;
  }
  
  // Update top questions
  const existingQuestion = this.analytics.topQuestions.find(q => q.question === question);
  if (existingQuestion) {
    existingQuestion.count += 1;
  } else {
    this.analytics.topQuestions.push({ question, count: 1 });
  }
  
  // Keep only top 10 questions
  this.analytics.topQuestions.sort((a, b) => b.count - a.count);
  this.analytics.topQuestions = this.analytics.topQuestions.slice(0, 10);
  
  return this.save();
};

module.exports = mongoose.model('Bot', botSchema);



