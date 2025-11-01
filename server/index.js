const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const connectDB = require('./config/database');

// Load environment variables first
require('dotenv').config();

const authRoutes = require('./routes/auth');
const botRoutes = require('./routes/bot');
const subscriptionRoutes = require('./routes/subscription');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Session middleware
app.use(session({
  secret: process.env.JWT_SECRET || 'celebify_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bot', botRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// OAuth Strategies
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Here you would typically save/update user in database
    // For now, we'll just return the profile
    return done(null, profile);
  } catch (error) {
    return done(error, null);
  }
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Here you would typically save/update user in database
    // For now, we'll just return the profile
    return done(null, profile);
  } catch (error) {
    return done(error, null);
  }
}));

// Serialize/Deserialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// OAuth Routes
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/api/auth/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/dashboard',
  failureRedirect: 'http://localhost:3000/login'
}));

app.get('/api/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/api/auth/github/callback', passport.authenticate('github', {
  successRedirect: 'http://localhost:3000/dashboard',
  failureRedirect: 'http://localhost:3000/login'
}));

// Connect to database
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Celebify.AI server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
