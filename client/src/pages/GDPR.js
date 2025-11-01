import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Shield, User, Database, Mail } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
`;

const ContentSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SectionText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #4a4a4a;
  margin-bottom: 1rem;
`;

const GDPR = () => {
  return (
    <Container>
      <Content>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              color: 'white'
            }}
          >
            GDPR Compliance
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
            Your data protection rights under GDPR
          </motion.p>
        </Header>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Shield size={24} />
            GDPR Compliance
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Celebify.AI fully complies with GDPR.
            Users can request access, correction, or deletion of their personal data anytime.
          </motion.p>
        </ContentSection>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <User size={24} />
            Your Rights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            You have the right to access, rectify, erase, restrict processing, 
            and port your personal data. You also have the right to object to processing.
          </motion.p>
        </ContentSection>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Database size={24} />
            Data Processing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            We process your data lawfully, fairly, and transparently. 
            We only collect data that is necessary for our services.
          </motion.p>
        </ContentSection>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Mail size={24} />
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            For any GDPR-related requests or questions, please contact us at 
            hello.nexorasolutions@gmail.com
          </motion.p>
        </ContentSection>
      </Content>
    </Container>
  );
};

export default GDPR;