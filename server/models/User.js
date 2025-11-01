const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: Date,
    paypalSubscriptionId: String
  },
  usage: {
    messagesThisMonth: {
      type: Number,
      default: 0
    },
    lastResetDate: {
      type: Date,
      default: Date.now
    }
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

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Reset monthly usage
userSchema.methods.resetMonthlyUsage = function() {
  const now = new Date();
  const lastReset = new Date(this.usage.lastResetDate);
  
  if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
    this.usage.messagesThisMonth = 0;
    this.usage.lastResetDate = now;
    return this.save();
  }
  return Promise.resolve();
};

// Check if user can send message (free plan limit)
userSchema.methods.canSendMessage = function() {
  if (this.subscription.plan === 'pro') return true;
  return this.usage.messagesThisMonth < 50;
};

module.exports = mongoose.model('User', userSchema);



