const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get subscription info
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      subscription: user.subscription,
      usage: user.usage,
      limits: {
        free: {
          messagesPerMonth: 50,
          features: ['Basic AI personality', 'Watermark visible', 'Shared link only']
        },
        pro: {
          messagesPerMonth: 'unlimited',
          features: ['Advanced AI personality', 'No watermark', 'Custom learning', 'Analytics', 'Embed widget']
        }
      }
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ error: 'Server error fetching subscription' });
  }
});

// Upgrade to Pro
router.post('/upgrade', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.subscription.plan === 'pro') {
      return res.status(400).json({ error: 'User already has Pro subscription' });
    }

    // In a real implementation, you would:
    // 1. Verify PayPal payment
    // 2. Get subscription ID from PayPal
    // 3. Update user subscription
    
    // For demo purposes, we'll just update the plan
    user.subscription.plan = 'pro';
    user.subscription.status = 'active';
    user.subscription.startDate = new Date();
    user.subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    
    await user.save();

    res.json({
      message: 'Successfully upgraded to Pro!',
      subscription: user.subscription
    });
  } catch (error) {
    console.error('Upgrade subscription error:', error);
    res.status(500).json({ error: 'Server error upgrading subscription' });
  }
});

// Cancel subscription
router.post('/cancel', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.subscription.plan === 'free') {
      return res.status(400).json({ error: 'No active subscription to cancel' });
    }

    // In a real implementation, you would:
    // 1. Cancel PayPal subscription
    // 2. Set end date to current date
    
    user.subscription.status = 'cancelled';
    user.subscription.endDate = new Date();
    
    await user.save();

    res.json({
      message: 'Subscription cancelled successfully',
      subscription: user.subscription
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ error: 'Server error cancelling subscription' });
  }
});

// Get PayPal subscription link
router.get('/paypal-link', auth, async (req, res) => {
  try {
    const paypalLink = process.env.PAYPAL_SUBSCRIPTION_LINK;
    
    if (!paypalLink) {
      return res.status(500).json({ error: 'PayPal subscription link not configured' });
    }

    res.json({ 
      paypalLink,
      message: 'Redirect to PayPal to complete Pro subscription'
    });
  } catch (error) {
    console.error('Get PayPal link error:', error);
    res.status(500).json({ error: 'Server error getting PayPal link' });
  }
});

module.exports = router;



