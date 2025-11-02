# Celebify.AI 🤖

**Build your own AI chatbot that talks like you, answers fan questions, and promotes your content automatically.**

Celebify.AI lets influencers and creators build their own AI chatbot that engages with fans 24/7, matches their personality, and promotes their content automatically.

## ✨ Features

### Free Plan
- 🆓 **50 messages per month**
- 🤖 **Basic AI personality** with standard responses
- 🏷️ **Watermark visible**
- 🔗 **Access via shared link only**
- ⚙️ **Limited customization**: name, greeting, default content

### Pro Plan ($29/month)
- ♾️ **Unlimited fan chats** — no monthly limits
- 🎭 **Advanced AI personality** — matches creator's tone, emojis, and style
- ✨ **Watermark removed** — fully branded
- 🧠 **Custom learning** — AI can learn from YouTube transcripts, social posts, or website links
- 🌐 **Embed on website or social media**
- 📊 **Analytics dashboard** — track top fan questions, trending responses, engagement metrics
- 🎯 **Fan engagement tools** — auto-replies, smart suggestions, daily prompts
- 🚀 **Priority support** — fast setup and assistance

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB database
- OpenAI API key
- PayPal account (for Pro subscriptions)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/celebify-ai.git
   cd celebify-ai
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp env.example .env
   ```

   Update `.env` with your configuration:
   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/celebify-ai
   
   # JWT Secret
   JWT_SECRET=your_jwt_secret_here
   
   # PayPal Configuration
   PAYPAL_SUBSCRIPTION_LINK=your_paypal_subscription_link_here
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Frontend URL
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   ```

   Or start them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🏗️ Project Structure

```
celebify-ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth, etc.)
│   │   ├── pages/          # Page components
│   │   ├── styles/         # Styled components and themes
│   │   └── App.js          # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── middleware/         # Express middleware
│   └── index.js           # Server entry point
├── package.json           # Root package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Bot Management
- `GET /api/bot` - Get user's bots
- `POST /api/bot` - Create new bot
- `GET /api/bot/:id` - Get specific bot
- `PUT /api/bot/:id` - Update bot
- `DELETE /api/bot/:id` - Delete bot
- `POST /api/bot/chat/:publicLink` - Chat with bot (public)

### Subscription
- `GET /api/subscription` - Get subscription info
- `POST /api/subscription/upgrade` - Upgrade to Pro
- `POST /api/subscription/cancel` - Cancel subscription

### Analytics (Pro only)
- `GET /api/analytics/bot/:id` - Get bot analytics
- `GET /api/analytics/dashboard` - Get user dashboard

## 🎨 Customization

### Bot Personality
The AI personality system allows creators to customize:
- **Tone**: friendly, professional, casual, enthusiastic, witty
- **Style**: conversational, formal, playful, supportive
- **Emojis**: Enable/disable emoji usage
- **Custom Instructions**: Specific behavior guidelines
- **Learning Sources**: YouTube transcripts, social posts, website content

### Styling
The app uses styled-components with a modern design system:
- Gradient backgrounds
- Glass morphism effects
- Responsive design
- Dark theme with colorful accents
- Smooth animations with Framer Motion

## 🚀 Deployment

### Backend (Render, Railway, or similar)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with Node.js buildpack

### Frontend (Vercel, Netlify)
1. Connect your GitHub repository
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/build`
4. Deploy

### Database
- Use MongoDB Atlas for production
- Set up connection string in environment variables

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS configuration
- Input validation
- Secure headers with Helmet

## 📊 Analytics & Monitoring

### Pro Features
- Message volume tracking
- Unique user analytics
- Top questions analysis
- Engagement metrics
- Chat history review
- Performance insights

### Free Plan Limitations
- Basic message counting
- No detailed analytics
- Limited customization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: hello@celebify.ai
- 💬 Discord: [Join our community](https://discord.gg/celebify)
- 📖 Documentation: [docs.celebify.ai](https://docs.celebify.ai)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/celebify-ai/issues)

## 🙏 Acknowledgments

- OpenAI for the GPT API
- React and Node.js communities
- All the creators who inspire us to build better tools

---

**Built with ❤️ for creators by creators**

*Celebify.AI - Your AI personality, always online*







