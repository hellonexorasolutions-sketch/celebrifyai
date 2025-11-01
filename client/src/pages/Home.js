import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bot, 
  MessageCircle, 
  Users, 
  BarChart3, 
  Zap, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
    line-height: 1.6;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &.primary {
    background: white;
    color: #667eea;
    
    &:hover {
      background: #f8fafc;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
  }
  
  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
`;

const HeroVisual = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatPreview = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  max-width: 400px;
  width: 100%;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const ChatInfo = styled.div`
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }
  
  p {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
  }
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  max-width: 80%;
  
  &.user {
    background: #f3f4f6;
    color: #374151;
    align-self: flex-end;
  }
  
  &.bot {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    align-self: flex-start;
  }
`;

const FeaturesSection = styled.section`
  padding: 6rem 0;
  background: rgba(255, 255, 255, 0.05);
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
  
  .icon {
    width: 60px;
    height: 60px;
    border-radius: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: white;
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`;

const PricingSection = styled.section`
  padding: 6rem 0;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const PricingCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
  
  &.featured {
    border: 2px solid #f093fb;
    transform: scale(1.05);
    
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      font-weight: 600;
    }
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.5rem;
  }
  
  .price {
    font-size: 3rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    
    .period {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }
  
  .features {
    list-style: none;
    margin: 2rem 0;
    
    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 0.75rem;
      
      .check {
        color: #10b981;
      }
    }
  }
`;

const Home = () => {
  return (
    <>
      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ 
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                color: 'white'
              }}
            >
              Build Your AI
              <br />
              <span className="text-gradient">Personality</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ 
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                color: 'rgba(255, 255, 255, 0.95)'
              }}
            >
              Create a personalized AI chatbot that talks like you, 
              engages with fans 24/7, and promotes your content automatically.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <CTAButtons>
                <Button to="/register" className="primary">
                  Get Started Free
                  <ArrowRight size={20} />
                </Button>
                <Button to="/register" className="secondary">
                  <MessageCircle size={20} />
                  Try Demo
                </Button>
              </CTAButtons>
            </motion.div>
          </HeroContent>
          
          <HeroVisual>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <ChatPreview>
                <ChatHeader>
                  <Avatar>🤖</Avatar>
                  <ChatInfo>
                    <h3>Your AI Assistant</h3>
                    <p>Online now</p>
                  </ChatInfo>
                </ChatHeader>
                <ChatMessages>
                  <Message className="user">
                    Hi! What's your latest video about?
                  </Message>
                  <Message className="bot">
                    Hey! 👋 My latest video is about building AI chatbots! 
                    It's super exciting - I show how creators can engage 
                    with fans 24/7. Want to check it out? 🚀
                  </Message>
                  <Message className="user">
                    That sounds amazing! Where can I watch it?
                  </Message>
                  <Message className="bot">
                    You can find it on my YouTube channel! 
                    Just search for "AI Chatbots for Creators" 
                    or check the link in my bio 📺✨
                  </Message>
                </ChatMessages>
              </ChatPreview>
            </motion.div>
          </HeroVisual>
        </HeroContainer>
      </HeroSection>

      <FeaturesSection id="features">
        <SectionContainer>
          <SectionHeader>
            <h2>Why Choose Celebify.AI?</h2>
            <p>
              Everything you need to create an AI assistant that truly represents you
            </p>
          </SectionHeader>
          
          <FeaturesGrid>
            <FeatureCard>
              <div className="icon">
                <Bot size={24} />
              </div>
              <h3>Personalized AI</h3>
              <p>
                Train your AI to match your tone, style, and personality. 
                It learns from your content and responds just like you would.
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <div className="icon">
                <MessageCircle size={24} />
              </div>
              <h3>24/7 Engagement</h3>
              <p>
                Never miss a fan interaction. Your AI responds instantly 
                to questions, promotes your content, and keeps fans engaged.
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <div className="icon">
                <BarChart3 size={24} />
              </div>
              <h3>Analytics & Insights</h3>
              <p>
                Track fan interactions, popular questions, and engagement metrics 
                to understand your audience better.
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <div className="icon">
                <Zap size={24} />
              </div>
              <h3>Easy Setup</h3>
              <p>
                Get your AI chatbot running in minutes. No coding required - 
                just customize your personality and start engaging.
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <div className="icon">
                <Users size={24} />
              </div>
              <h3>Fan Growth</h3>
              <p>
                Convert visitors into engaged fans with personalized interactions 
                that feel authentic and build genuine connections.
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <div className="icon">
                <Shield size={24} />
              </div>
              <h3>Secure & Reliable</h3>
              <p>
                Built with enterprise-grade security. Your data and your fans' 
                conversations are always protected and private.
              </p>
            </FeatureCard>
          </FeaturesGrid>
        </SectionContainer>
      </FeaturesSection>

      <PricingSection id="pricing">
        <SectionContainer>
          <SectionHeader>
            <h2>Simple, Transparent Pricing</h2>
            <p>
              Start free, upgrade when you're ready to scale
            </p>
          </SectionHeader>
          
          <PricingGrid>
            <PricingCard>
              <h3>Free</h3>
              <div className="price">
                $0<span className="period">/month</span>
              </div>
              <ul className="features">
                <li>
                  <CheckCircle size={16} className="check" />
                  50 messages per month
                </li>
                <li>
                  <CheckCircle size={16} className="check" />
                  Basic AI personality
                </li>
                <li>
                  <CheckCircle size={16} className="check" />
                  Watermark visible
                </li>
                <li>
                  <CheckCircle size={16} className="check" />
                  Shared link only
                </li>
              </ul>
              <Button to="/register" className="secondary" style={{ width: '100%' }}>
                Get Started
              </Button>
            </PricingCard>
            
            <PricingCard className="featured">
              <h3>Pro</h3>
              <div className="price">
                $29<span className="period">/month</span>
              </div>
              <ul className="features">
                <li>
                  <CheckCircle size={16} className="check" />
                  Unlimited messages
                </li>
                <li>
                  <CheckCircle size={16} className="check" />
                  Advanced AI personality
                </li>
                <li>
                  <CheckCircle size={16} className="check" />
                  No watermark
                </li>
                <li>
                  <CheckCircle size={16} className="check" />
                  Custom learning
                </li>
                <li>
                  <CheckCircle size={16} className="check" />
                  Analytics dashboard
                </li>
                <li>
                  <CheckCircle size={16} className="check" />
                  Embed anywhere
                </li>
              </ul>
              <Button to="/register" className="primary" style={{ width: '100%' }}>
                Upgrade to Pro
              </Button>
            </PricingCard>
          </PricingGrid>
        </SectionContainer>
      </PricingSection>
    </>
  );
};

export default Home;

