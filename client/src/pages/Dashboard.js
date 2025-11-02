import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  Bot, 
  Plus, 
  MessageCircle, 
  Users, 
  BarChart3, 
  Settings,
  ExternalLink,
  Copy,
  CheckCircle,
  Crown,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.15);
  }
  
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .content {
    flex: 1;
    
    h3 {
      font-size: 2rem;
      font-weight: 700;
      color: white;
      margin: 0;
    }
    
    p {
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
      font-size: 0.875rem;
    }
  }
`;

const SubscriptionCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.plan === 'pro' 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    };
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    
    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: white;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .badge {
      background: ${props => props.plan === 'pro' 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
        : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      };
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
  
  .usage {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    
    .progress {
      flex: 1;
      height: 8px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      overflow: hidden;
      
      .fill {
        height: 100%;
        background: ${props => props.plan === 'pro' 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
          : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        };
        transition: width 0.3s ease;
      }
    }
    
    .text {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.875rem;
      white-space: nowrap;
    }
  }
  
  .actions {
    display: flex;
    gap: 1rem;
    
    a {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      
      &.primary {
        background: white;
        color: #667eea;
        
        &:hover {
          background: #f8fafc;
          transform: translateY(-1px);
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
  }
`;

const BotsSection = styled.div`
  h2 {
    font-size: 1.875rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
  }
`;

const BotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const BotCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.15);
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: white;
      margin: 0;
    }
    
    .status {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${props => props.isActive ? '#10b981' : '#6b7280'};
    }
  }
  
  .stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
    
    .stat {
      text-align: center;
      
      .number {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        margin: 0;
      }
      
      .label {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }
  }
  
  .actions {
    display: flex;
    gap: 0.5rem;
    
    a, button {
      flex: 1;
      padding: 0.5rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      text-align: center;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      
      &.primary {
        background: white;
        color: #667eea;
        
        &:hover {
          background: #f8fafc;
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
  }
`;

const CreateBotCard = styled(Link)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  min-height: 200px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
  
  .icon {
    width: 60px;
    height: 60px;
    border-radius: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    color: white;
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
`;

const Dashboard = () => {
  const { user } = useAuth();
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(null);

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    try {
      const response = await axios.get('/api/bot');
      setBots(response.data.bots);
    } catch (error) {
      console.error('Error fetching bots:', error);
      toast.error('Failed to load bots');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, botId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(botId);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const getUsagePercentage = () => {
    if (user.subscription.plan === 'pro') return 0;
    return Math.min((user.usage.messagesThisMonth / 50) * 100, 100);
  };

  const getUsageText = () => {
    if (user.subscription.plan === 'pro') {
      return 'Unlimited messages';
    }
    return `${user.usage.messagesThisMonth} / 50 messages this month`;
  };

  if (loading) {
    return (
      <DashboardContainer>
        <Container>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            fontSize: '18px',
            color: 'white'
          }}>
            Loading your dashboard...
          </div>
        </Container>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Container>
        <Header>
          <h1>Welcome back, {user.name}! 👋</h1>
          <p>Manage your AI chatbots and track your fan engagement</p>
        </Header>

        <StatsGrid>
          <StatCard>
            <div className="icon">
              <Bot size={24} />
            </div>
            <div className="content">
              <h3>{bots.length}</h3>
              <p>Active Bots</p>
            </div>
          </StatCard>
          
          <StatCard>
            <div className="icon">
              <MessageCircle size={24} />
            </div>
            <div className="content">
              <h3>{bots.reduce((sum, bot) => sum + bot.analytics.totalMessages, 0)}</h3>
              <p>Total Messages</p>
            </div>
          </StatCard>
          
          <StatCard>
            <div className="icon">
              <Users size={24} />
            </div>
            <div className="content">
              <h3>{bots.reduce((sum, bot) => sum + bot.analytics.uniqueUsers, 0)}</h3>
              <p>Unique Fans</p>
            </div>
          </StatCard>
        </StatsGrid>

        <SubscriptionCard plan={user.subscription.plan}>
          <div className="header">
            <h3>
              {user.subscription.plan === 'pro' ? (
                <>
                  <Crown size={20} />
                  Pro Plan
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Free Plan
                </>
              )}
            </h3>
            <span className="badge">
              {user.subscription.plan === 'pro' ? 'Pro' : 'Free'}
            </span>
          </div>
          
          <div className="usage">
            <div className="progress">
              <div 
                className="fill" 
                style={{ width: `${getUsagePercentage()}%` }}
              />
            </div>
            <span className="text">{getUsageText()}</span>
          </div>
          
          <div className="actions">
            {user.subscription.plan === 'free' ? (
              <Link to="/subscription" className="primary">
                Upgrade to Pro
              </Link>
            ) : (
              <Link to="/subscription" className="secondary">
                Manage Subscription
              </Link>
            )}
          </div>
        </SubscriptionCard>

        <BotsSection>
          <h2>Your AI Bots</h2>
          
          <BotsGrid>
            {bots.map((bot) => (
              <BotCard key={bot._id} isActive={bot.settings.isActive}>
                <div className="header">
                  <h3>{bot.name}</h3>
                  <div className="status" />
                </div>
                
                <div className="stats">
                  <div className="stat">
                    <p className="number">{bot.analytics.totalMessages}</p>
                    <p className="label">Messages</p>
                  </div>
                  <div className="stat">
                    <p className="number">{bot.analytics.uniqueUsers}</p>
                    <p className="label">Fans</p>
                  </div>
                </div>
                
                <div className="actions">
                  <Link to={`/bot/${bot._id}`} className="primary">
                    <Settings size={16} />
                    Manage
                  </Link>
                  <button 
                    className="secondary"
                    onClick={() => copyToClipboard(bot.settings.publicLink, bot._id)}
                  >
                    {copiedLink === bot._id ? (
                      <CheckCircle size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                    Copy Link
                  </button>
                  <a 
                    href={bot.settings.publicLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="secondary"
                  >
                    <ExternalLink size={16} />
                    Test
                  </a>
                </div>
              </BotCard>
            ))}
            
            <CreateBotCard to="/bot-builder">
              <div className="icon">
                <Plus size={24} />
              </div>
              <h3>Create New Bot</h3>
              <p>Build your personalized AI assistant</p>
            </CreateBotCard>
          </BotsGrid>
        </BotsSection>
      </Container>
    </DashboardContainer>
  );
};

export default Dashboard;







