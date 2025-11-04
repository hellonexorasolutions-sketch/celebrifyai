import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { 
  Bot, 
  MessageCircle, 
  Settings, 
  Sparkles,
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  Plus,
  Trash2
} from 'lucide-react';

const BuilderContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  margin-bottom: 3rem;
  
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    margin-bottom: 1rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: white;
    }
  }
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
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
  }
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin: 0;
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
  
  input, textarea, select {
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
    min-height: 100px;
  }
`;

const PersonalityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const PersonalityOption = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.selected {
    background: rgba(102, 126, 234, 0.2);
    border-color: #667eea;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    margin: 0;
  }
`;

const QAPair = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    
    h4 {
      color: white;
      margin: 0;
      font-size: 0.875rem;
      font-weight: 600;
    }
    
    button {
      background: none;
      border: none;
      color: #ef4444;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      transition: background-color 0.3s ease;
      
      &:hover {
        background: rgba(239, 68, 68, 0.1);
      }
    }
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }
`;

const AddButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px dashed rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  padding: 1rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  
  button {
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    
    &.primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }
    }
    
    &.secondary {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
`;

const BotBuilder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    greeting: '',
    personality: {
      tone: 'friendly',
      style: 'conversational',
      emojis: true,
      customInstructions: ''
    },
    defaultResponses: []
  });
  
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const personalityOptions = [
    {
      tone: 'friendly',
      style: 'conversational',
      title: 'Friendly & Conversational',
      description: 'Warm, approachable, and easy to talk to'
    },
    {
      tone: 'professional',
      style: 'formal',
      title: 'Professional & Formal',
      description: 'Polite, structured, and business-like'
    },
    {
      tone: 'enthusiastic',
      style: 'playful',
      title: 'Enthusiastic & Playful',
      description: 'Energetic, fun, and full of personality'
    },
    {
      tone: 'casual',
      style: 'conversational',
      title: 'Casual & Relaxed',
      description: 'Easy-going, natural, and down-to-earth'
    }
  ];

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addQAPair = () => {
    setFormData(prev => ({
      ...prev,
      defaultResponses: [...prev.defaultResponses, { question: '', answer: '' }]
    }));
  };

  const updateQAPair = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      defaultResponses: prev.defaultResponses.map((qa, i) => 
        i === index ? { ...qa, [field]: value } : qa
      )
    }));
  };

  const removeQAPair = (index) => {
    setFormData(prev => ({
      ...prev,
      defaultResponses: prev.defaultResponses.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/bot', formData);
      toast.success('Bot created successfully!');
      navigate(`/bot/${response.data.bot.id}`);
    } catch (error) {
      console.error('Error creating bot:', error);
      toast.error('Failed to create bot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BuilderContainer>
      <Container>
        <Header>
          <a href="/dashboard" className="back-link">
            <ArrowLeft size={20} />
            Back to Dashboard
          </a>
          <h1>
            <Bot size={32} />
            Create Your AI Bot
          </h1>
          <p>Build a personalized AI assistant that represents you</p>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Section>
            <SectionHeader>
              <div className="icon">
                <Settings size={20} />
              </div>
              <h2>Basic Information</h2>
            </SectionHeader>
            
            <FormGroup>
              <label htmlFor="name">Bot Name</label>
              <input
                type="text"
                id="name"
                placeholder="e.g., My AI Assistant"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="greeting">Welcome Message</label>
              <textarea
                id="greeting"
                placeholder="e.g., Hi! I'm your AI assistant. How can I help you today? 😊"
                value={formData.greeting}
                onChange={(e) => handleChange('greeting', e.target.value)}
                required
              />
            </FormGroup>
          </Section>

          <Section>
            <SectionHeader>
              <div className="icon">
                <Sparkles size={20} />
              </div>
              <h2>Personality & Style</h2>
            </SectionHeader>
            
            <FormGroup>
              <label>Choose Your Bot's Personality</label>
              <PersonalityGrid>
                {personalityOptions.map((option) => (
                  <PersonalityOption
                    key={`${option.tone}-${option.style}`}
                    className={
                      formData.personality.tone === option.tone && 
                      formData.personality.style === option.style 
                        ? 'selected' 
                        : ''
                    }
                    onClick={() => {
                      handleChange('personality.tone', option.tone);
                      handleChange('personality.style', option.style);
                    }}
                  >
                    <h3>{option.title}</h3>
                    <p>{option.description}</p>
                  </PersonalityOption>
                ))}
              </PersonalityGrid>
            </FormGroup>
            
            <FormGroup>
              <label>
                <input
                  type="checkbox"
                  checked={formData.personality.emojis}
                  onChange={(e) => handleChange('personality.emojis', e.target.checked)}
                />
                {' '}Use emojis in responses
              </label>
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="customInstructions">Custom Instructions (Optional)</label>
              <textarea
                id="customInstructions"
                placeholder="Add any specific instructions for how your bot should behave..."
                value={formData.personality.customInstructions}
                onChange={(e) => handleChange('personality.customInstructions', e.target.value)}
                rows={3}
              />
            </FormGroup>
          </Section>

          <Section>
            <SectionHeader>
              <div className="icon">
                <MessageCircle size={20} />
              </div>
              <h2>Default Responses</h2>
            </SectionHeader>
            
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem' }}>
              Add common questions and answers to help your bot respond better to fan inquiries.
            </p>
            
            {formData.defaultResponses.map((qa, index) => (
              <QAPair key={index}>
                <div className="header">
                  <h4>Q&A Pair #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeQAPair(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Question (e.g., What's your latest video about?)"
                  value={qa.question}
                  onChange={(e) => updateQAPair(index, 'question', e.target.value)}
                />
                <textarea
                  placeholder="Answer (e.g., My latest video is about AI chatbots for creators! Check it out on my channel 🚀)"
                  value={qa.answer}
                  onChange={(e) => updateQAPair(index, 'answer', e.target.value)}
                  rows={2}
                />
              </QAPair>
            ))}
            
            <AddButton type="button" onClick={addQAPair}>
              <Plus size={16} />
              Add Q&A Pair
            </AddButton>
          </Section>

          <Actions>
            <button
              type="button"
              className="secondary"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button
              type="submit"
              className="primary"
              disabled={loading || !formData.name || !formData.greeting}
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Creating Bot...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Create Bot
                </>
              )}
            </button>
          </Actions>
        </Form>
      </Container>
    </BuilderContainer>
  );
};

export default BotBuilder;








