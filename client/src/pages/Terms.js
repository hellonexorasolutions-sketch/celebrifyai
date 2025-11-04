import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, Users } from 'lucide-react';

const TermsContainer = styled.div`
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

const WarningBox = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 2rem 0;
  
  h3 {
    color: #ef4444;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    line-height: 1.6;
  }
`;

const Terms = () => {
  return (
    <TermsContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
            Acceptance of Terms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            By using Celebify.AI, you agree to use the platform responsibly and not misuse any AI features. 
            These terms constitute a legally binding agreement between you and Celebify.AI.
          </motion.p>
        </ContentSection>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Users size={24} />
            User Responsibilities
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p>As a user of Celebify.AI, you agree to:</p>
            <ul>
              <li>Provide accurate and truthful information</li>
              <li>Use the service in compliance with applicable laws</li>
              <li>Not create harmful, offensive, or inappropriate content</li>
              <li>Respect the intellectual property rights of others</li>
              <li>Not attempt to reverse engineer or hack our systems</li>
              <li>Maintain the security of your account credentials</li>
            </ul>
          </motion.div>
        </ContentSection>

        <WarningBox>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <AlertTriangle size={20} />
            Prohibited Uses
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            You may not use Celebify.AI for any unlawful purpose or to solicit others to perform unlawful acts. 
            This includes but is not limited to: harassment, fraud, impersonation, or any activity that violates 
            applicable laws or regulations.
          </motion.p>
        </WarningBox>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Shield size={24} />
            Service Availability
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <p>We reserve the right to:</p>
            <ul>
              <li>Modify or discontinue the service at any time</li>
              <li>Update our services or policies without prior notice</li>
              <li>Suspend or terminate accounts that violate these terms</li>
              <li>Implement security measures to protect our platform</li>
              <li>Make changes to pricing or features</li>
            </ul>
          </motion.div>
        </ContentSection>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Intellectual Property
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            You retain ownership of your content and data. By using our service, you grant us a limited license 
            to use your content solely for the purpose of providing our services. We reserve all rights to our 
            platform, technology, and intellectual property.
          </motion.p>
        </ContentSection>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            Limitation of Liability
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Celebify.AI is provided "as is" without warranties of any kind. We are not liable for any indirect, 
            incidental, special, or consequential damages arising from your use of our service. Our total liability 
            is limited to the amount you paid for our services in the 12 months preceding the claim.
          </motion.p>
        </ContentSection>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Changes to Terms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            We reserve the right to update our services or policies at any time. We will notify users of 
            significant changes via email or through our platform. Continued use of our service after changes 
            constitutes acceptance of the new terms.
          </motion.p>
        </ContentSection>

        <ContentSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
          >
            Contact Information
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            For questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:hello.nexorasolutions@gmail.com" style={{ color: '#667eea' }}>
              hello.nexorasolutions@gmail.com
            </a>
            .
          </motion.p>
        </ContentSection>
      </Container>
    </TermsContainer>
  );
};

export default Terms;







