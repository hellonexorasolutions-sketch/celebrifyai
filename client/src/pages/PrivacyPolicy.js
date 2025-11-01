import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const PrivacyContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 800px;
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
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
  
  ul {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.8;
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const HighlightBox = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 2rem 0;
  
  h3 {
    color: white;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    line-height: 1.6;
  }
`;

const PrivacyPolicy = () => {
  return (
    <PrivacyContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your privacy is important to us
          </motion.p>
        </Header>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Shield size={24} />
            Our Commitment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We collect only necessary user data to operate Celebify.AI services. 
            We never sell or share your data with third parties.
            For data requests, contact hello.nexorasolutions@gmail.com.
          </motion.p>
        </ContentSection>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Database size={24} />
            Information We Collect
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p>We collect the following types of information:</p>
            <ul>
              <li>Account information (name, email address)</li>
              <li>Bot configuration and personality settings</li>
              <li>Chat interactions and analytics (anonymized)</li>
              <li>Usage statistics to improve our services</li>
              <li>Technical information (IP address, browser type)</li>
            </ul>
          </motion.div>
        </ContentSection>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Lock size={24} />
            How We Protect Your Data
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p>We implement industry-standard security measures:</p>
            <ul>
              <li>End-to-end encryption for all data transmission</li>
              <li>Secure servers with regular security updates</li>
              <li>Access controls and authentication protocols</li>
              <li>Regular security audits and monitoring</li>
              <li>Data backup and recovery procedures</li>
            </ul>
          </motion.div>
        </ContentSection>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Eye size={24} />
            Your Rights
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </motion.div>
        </ContentSection>

        <HighlightBox>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Data Deletion Request
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            You can request data deletion anytime by contacting us at{' '}
            <a href="mailto:hello.nexorasolutions@gmail.com" style={{ color: '#667eea' }}>
              hello.nexorasolutions@gmail.com
            </a>
            . We will process your request within 30 days.
          </motion.p>
        </HighlightBox>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            If you have any questions about this Privacy Policy or our data practices, 
            please contact us at{' '}
            <a href="mailto:hello.nexorasolutions@gmail.com" style={{ color: '#667eea' }}>
              hello.nexorasolutions@gmail.com
            </a>
            .
          </motion.p>
        </ContentSection>
      </Container>
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;
