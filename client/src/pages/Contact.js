import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactContainer = styled.div`
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  .icon {
    width: 40px;
    height: 40px;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
  }
  
  .content {
    h3 {
      font-size: 1rem;
      font-weight: 600;
      color: white;
      margin: 0 0 0.25rem 0;
    }
    
    p {
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
      font-size: 0.875rem;
    }
    
    a {
      color: #667eea;
      text-decoration: none;
      
      &:hover {
        color: #764ba2;
        text-decoration: underline;
      }
    }
  }
`;

const ContactForm = styled.form`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    font-weight: 600;
    color: white;
    margin-bottom: 0.5rem;
  }
  
  input, textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
    
    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 120px;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in touch with our team for support, questions, or feedback
          </motion.p>
        </Header>

        <ContactGrid>
          <ContactInfo>
            <h2>Get in Touch</h2>
            
            <ContactItem>
              <div className="icon">
                <Mail size={20} />
              </div>
              <div className="content">
                <h3>Email</h3>
                <p>
                  <a href="mailto:hello.nexorasolutions@gmail.com">
                    hello.nexorasolutions@gmail.com
                  </a>
                </p>
              </div>
            </ContactItem>

            <ContactItem>
              <div className="icon">
                <MessageCircle size={20} />
              </div>
              <div className="content">
                <h3>Support</h3>
                <p>We typically respond within 24 hours</p>
              </div>
            </ContactItem>

            <ContactItem>
              <div className="icon">
                <Phone size={20} />
              </div>
              <div className="content">
                <h3>Business Hours</h3>
                <p>Monday - Friday, 9 AM - 6 PM EST</p>
              </div>
            </ContactItem>

            <ContactItem>
              <div className="icon">
                <MapPin size={20} />
              </div>
              <div className="content">
                <h3>Location</h3>
                <p>Remote-first company</p>
              </div>
            </ContactItem>
          </ContactInfo>

          <ContactForm onSubmit={handleSubmit}>
            <h2>Send us a Message</h2>
            
            <FormGroup>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us more about your inquiry..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
              <Send size={20} />
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactContainer>
  );
};

export default Contact;





