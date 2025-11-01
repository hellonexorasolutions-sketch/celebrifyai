import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, Mail, Search, ChevronDown, ChevronUp } from 'lucide-react';

const SupportContainer = styled.div`
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
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }
`;

const SearchBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 3rem;
  
  .search-input {
    display: flex;
    gap: 1rem;
    align-items: center;
    
    input {
      flex: 1;
      padding: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 1rem;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
      
      &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }
    }
    
    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 0.5rem;
      padding: 1rem 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
      }
    }
  }
`;

const FAQSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
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
`;

const FAQItem = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
  
  &:last-child {
    border-bottom: none;
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: white;
  text-align: left;
  padding: 1rem 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  
  &:hover {
    color: #667eea;
  }
`;

const FAQAnswer = styled.div`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  padding-bottom: 1rem;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const ContactSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
  }
  
  a {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    text-decoration: none;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
    }
  }
`;

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I create my first AI bot?",
      answer: "Simply sign up for an account, click 'Create Bot', and follow the step-by-step wizard to customize your bot's personality, responses, and appearance."
    },
    {
      question: "What's the difference between Free and Pro plans?",
      answer: "Free plan includes 50 messages per month with basic features and watermark. Pro plan offers unlimited messages, advanced AI personality, no watermark, analytics, and custom learning capabilities."
    },
    {
      question: "How does the AI learn my personality?",
      answer: "Our AI analyzes your content, communication style, and preferences to create a personalized chatbot that responds like you would. You can also provide custom instructions and Q&A pairs."
    },
    {
      question: "Can I embed my bot on my website?",
      answer: "Yes! Pro users can embed their bot anywhere using our embed code. The bot will appear as a chat widget on your website or social media."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use end-to-end encryption, secure servers, and comply with GDPR. Your data is never sold or shared with third parties."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel anytime from your account settings or by contacting us. Your Pro features will remain active until the end of your billing period."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <SupportContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Support Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find answers to common questions and get help
          </motion.p>
        </Header>

        <SearchBox>
          <div className="search-input">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <Search size={20} />
              Search
            </button>
          </div>
        </SearchBox>

        <FAQSection>
          <h2>
            <HelpCircle size={24} />
            Frequently Asked Questions
          </h2>
          
          {faqs.map((faq, index) => (
            <FAQItem key={index}>
              <FAQQuestion onClick={() => toggleFAQ(index)}>
                {faq.question}
                {openFAQ === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </FAQQuestion>
              <FAQAnswer isOpen={openFAQ === index}>
                {faq.answer}
              </FAQAnswer>
            </FAQItem>
          ))}
        </FAQSection>

        <ContactSection>
          <h2>
            <MessageCircle size={24} />
            Still Need Help?
          </h2>
          <p>
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <a href="mailto:hello.nexorasolutions@gmail.com">
            <Mail size={20} />
            Contact Support
          </a>
        </ContactSection>
      </Container>
    </SupportContainer>
  );
};

export default Support;





