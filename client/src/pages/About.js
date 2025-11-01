import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Bot, Users, Heart, Target } from 'lucide-react';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  
  p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    max-width: 600px;
    margin: 0 auto;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }
`;

const ContentSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 3rem;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  p {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.8;
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
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
    margin: 0;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Celebify.AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empowering creators with AI-powered personal assistants
          </motion.p>
        </Header>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            At Celebify.AI, we help creators, influencers, and public figures build their own AI-powered personas. 
            Our mission is to let fans interact 24/7 with authentic, personality-driven chatbots powered by AI.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Whether you're an artist, educator, or entrepreneur, Celebify.AI helps you grow your brand through meaningful engagement.
          </motion.p>
        </ContentSection>

        <FeaturesGrid>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <FeatureCard>
              <div className="icon">
                <Bot size={24} />
              </div>
              <h3>AI-Powered</h3>
              <p>Advanced AI technology that learns and mimics your unique personality and communication style.</p>
            </FeatureCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <FeatureCard>
              <div className="icon">
                <Users size={24} />
              </div>
              <h3>24/7 Engagement</h3>
              <p>Never miss a fan interaction. Your AI assistant responds instantly to questions and promotes your content.</p>
            </FeatureCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <FeatureCard>
              <div className="icon">
                <Heart size={24} />
              </div>
              <h3>Authentic Connection</h3>
              <p>Build genuine relationships with your audience through personalized AI interactions that feel real.</p>
            </FeatureCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <FeatureCard>
              <div className="icon">
                <Target size={24} />
              </div>
              <h3>Brand Growth</h3>
              <p>Scale your influence and grow your audience with AI that works around the clock to engage fans.</p>
            </FeatureCard>
          </motion.div>
        </FeaturesGrid>
      </Container>
    </AboutContainer>
  );
};

export default About;





