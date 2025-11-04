import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FileText, Shield, AlertTriangle } from 'lucide-react';

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

const TermsOfService = () => {
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
            Terms of Service
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
            Please read these terms carefully before using our service
          </motion.p>
        </Header>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <FileText size={24} />
            Agreement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            By using Celebify.AI, you agree to comply with our guidelines and not misuse any AI features.
            We may modify our service at any time.
          </motion.p>
        </ContentSection>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Shield size={24} />
            User Responsibilities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            You are responsible for the content you create and share through our platform. 
            You must be at least 13 years old to use our service.
          </motion.p>
        </ContentSection>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <AlertTriangle size={24} />
            Service Modifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            We reserve the right to modify or discontinue our service at any time. 
            We may suspend accounts that violate our community guidelines.
          </motion.p>
        </ContentSection>
      </Content>
    </Container>
  );
};

export default TermsOfService;







