import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3rem 0 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #f093fb;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
  
  &:hover {
    color: #f093fb;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Celebify.AI</h3>
          <p>
            Build your own AI chatbot that talks like you. 
            Engage with fans 24/7 and grow your audience.
          </p>
        </FooterSection>

        <FooterSection>
          <h3>Support</h3>
          <FooterLinks>
            <FooterLink to="/support">Support</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Legal</h3>
          <FooterLinks>
            <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/cookie-policy">Cookie Policy</FooterLink>
            <FooterLink to="/gdpr">GDPR</FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>
          © 2024 Celebify.AI. Made with <Heart size={16} color="#ef4444" /> for creators.
        </Copyright>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
          Powered by OpenAI
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

