# Celebify.AI Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or MongoDB Atlas)
- OpenAI API key

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Setup

1. **Copy the environment file:**
   ```bash
   cp env.example server/.env
   ```

2. **Update `server/.env` with your values:**
   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=your_actual_openai_api_key_here
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/celebify-ai
   
   # JWT Secret (generate a secure random string)
   JWT_SECRET=your_secure_jwt_secret_here
   
   # PayPal Configuration (optional for now)
   PAYPAL_SUBSCRIPTION_LINK=your_paypal_subscription_link_here
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Frontend URL
   CLIENT_URL=http://localhost:3000
   ```

### 3. Start the Application

**Option A: Using the startup script**
```bash
# Windows
start-dev.bat

# Linux/Mac
./start-dev.sh
```

**Option B: Manual start**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

### 4. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🔧 Configuration Details

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add it to `server/.env` as `OPENAI_API_KEY`

### Database Setup

**Option A: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/celebify-ai` in your `.env`

**Option B: MongoDB Atlas (Recommended)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in your `.env`

### JWT Secret
Generate a secure random string for JWT_SECRET:
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot connect to backend"**
   - Check if server is running on port 5000
   - Verify proxy setting in `client/package.json`
   - Ensure no firewall blocking the connection

2. **"OpenAI API key not configured"**
   - Add your OpenAI API key to `server/.env`
   - Restart the server after adding the key

3. **"Database connection failed"**
   - Check MongoDB is running
   - Verify MONGODB_URI in `.env`
   - Ensure database credentials are correct

4. **"Port already in use"**
   - Kill processes using ports 3000 or 5000
   - Or change ports in configuration

### Development Tips

- **Hot Reload:** Both frontend and backend support hot reload
- **API Testing:** Use Postman or curl to test API endpoints
- **Database:** Use MongoDB Compass to view your data
- **Logs:** Check console output for error messages

## 📁 Project Structure

```
celebify-ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── styles/         # Styled components
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── middleware/         # Express middleware
│   └── index.js           # Server entry point
├── package.json           # Root dependencies
├── env.example            # Environment template
└── README.md              # Project documentation
```

## 🚀 Deployment

### Backend (Render, Railway, Heroku)
1. Connect GitHub repository
2. Set environment variables
3. Deploy with Node.js buildpack

### Frontend (Vercel, Netlify)
1. Connect GitHub repository
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/build`

### Database
- Use MongoDB Atlas for production
- Set up connection string in environment variables

## 📞 Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check if ports 3000 and 5000 are available

## ✅ Verification

After setup, you should be able to:
- ✅ Access http://localhost:3000
- ✅ Register a new account
- ✅ Login with credentials
- ✅ Create a new AI bot
- ✅ Chat with your bot
- ✅ View analytics (Pro features)

---

**Happy coding! 🎉**





