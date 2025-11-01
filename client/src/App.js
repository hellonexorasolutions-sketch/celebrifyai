import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BotBuilder from './pages/BotBuilder';
import BotDetails from './pages/BotDetails';
import Analytics from './pages/Analytics';
import Subscription from './pages/Subscription';
import ChatWidget from './pages/ChatWidget';
import About from './pages/About';
import Contact from './pages/Contact';
import Support from './pages/Support';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import TermsOfService from './pages/TermsOfService';
import GDPR from './pages/GDPR';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: 'white'
      }}>
        Loading...
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect if logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: 'white'
      }}>
        Loading...
      </div>
    );
  }
  
  return user ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/chat/:publicLink" element={<ChatWidget />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/gdpr" element={<GDPR />} />
            
            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bot-builder" 
              element={
                <ProtectedRoute>
                  <BotBuilder />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bot/:id" 
              element={
                <ProtectedRoute>
                  <BotDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics/:id" 
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/subscription" 
              element={
                <ProtectedRoute>
                  <Subscription />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

