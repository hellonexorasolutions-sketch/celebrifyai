import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  Loader2,
  MessageCircle
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: 'Inter', sans-serif;
`;

const ToggleButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4);
  }
`;

const ChatWindow = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  @media (max-width: 480px) {
    width: calc(100vw - 40px);
    right: -10px;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .bot-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    
    .details {
      h3 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
      }
      
      p {
        font-size: 0.75rem;
        opacity: 0.8;
        margin: 0;
      }
    }
  }
  
  .controls {
    display: flex;
    gap: 0.5rem;
    
    button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      transition: background-color 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }
`;

const Message = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  
  &.user {
    flex-direction: row-reverse;
    
    .message-content {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
  }
  
  &.bot {
    .message-content {
      background: #f3f4f6;
      color: #374151;
    }
  }
  
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    
    &.user {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    &.bot {
      background: #e5e7eb;
      color: #6b7280;
    }
  }
  
  .message-content {
    max-width: 80%;
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    line-height: 1.4;
    word-wrap: break-word;
  }
`;

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 1.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #667eea;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  font-style: italic;
  
  .spinner {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const Watermark = styled.div`
  text-align: center;
  padding: 0.5rem;
  background: #f8fafc;
  border-top: 1px solid #e5e7eb;
  font-size: 0.75rem;
  color: #6b7280;
  
  a {
    color: #667eea;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ChatWidget = () => {
  const { publicLink } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [botInfo, setBotInfo] = useState(null);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Add welcome message
    if (botInfo) {
      setMessages([{
        id: Date.now(),
        role: 'bot',
        content: botInfo.greeting || 'Hello! How can I help you today?',
        timestamp: new Date()
      }]);
    }
  }, [botInfo]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await axios.post(`/api/bot/chat/${publicLink}`, {
        message: inputValue,
        sessionId
      });

      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: response.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to send message');
      
      const errorMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: 'Sorry, I\'m having trouble responding right now. Please try again later.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <WidgetContainer>
      <ToggleButton
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </ToggleButton>

      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 60 : 500
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ChatHeader>
              <div className="bot-info">
                <div className="avatar bot">🤖</div>
                <div className="details">
                  <h3>{botInfo?.name || 'AI Assistant'}</h3>
                  <p>Online now</p>
                </div>
              </div>
              <div className="controls">
                <button onClick={minimizeChat}>
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button onClick={toggleChat}>
                  <X size={16} />
                </button>
              </div>
            </ChatHeader>

            {!isMinimized && (
              <>
                <MessagesContainer>
                  {messages.map((message) => (
                    <Message
                      key={message.id}
                      className={message.role}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`avatar ${message.role}`}>
                        {message.role === 'user' ? '👤' : '🤖'}
                      </div>
                      <div className="message-content">
                        {message.content}
                      </div>
                    </Message>
                  ))}
                  
                  {loading && (
                    <LoadingMessage>
                      <Loader2 size={16} className="spinner" />
                      AI is typing...
                    </LoadingMessage>
                  )}
                  
                  <div ref={messagesEndRef} />
                </MessagesContainer>

                <InputContainer>
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                  />
                  <SendButton
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || loading}
                  >
                    <Send size={16} />
                  </SendButton>
                </InputContainer>

                <Watermark>
                  Powered by <a href="https://celebify.ai" target="_blank" rel="noopener noreferrer">Celebify.AI</a>
                </Watermark>
              </>
            )}
          </ChatWindow>
        )}
      </AnimatePresence>
    </WidgetContainer>
  );
};

export default ChatWidget;






