import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { 
  Bot, 
  Settings, 
  BarChart3, 
  ExternalLink,
  Copy,
  CheckCircle,
  Edit,
  Trash2,
  Save,
  X,
  Plus,
  MessageCircle
} from 'lucide-react';

const BotDetailsContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1000px;
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

const BotInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: white;
      margin: 0;
    }
    
    .actions {
      display: flex;
      gap: 0.5rem;
    }
  }
  
  .details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    
    .detail-item {
      .label {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.875rem;
        margin-bottom: 0.25rem;
      }
      
      .value {
        color: white;
        font-weight: 600;
      }
    }
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 0.5rem;
`;

const Tab = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#667eea' : 'white'};
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const TabContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
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
    
    &.danger {
      background: #ef4444;
      color: white;
      
      &:hover {
        background: #dc2626;
      }
    }
  }
`;

const BotDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [bot, setBot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('settings');
  const [editing, setEditing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchBot();
  }, [id]);

  const fetchBot = async () => {
    try {
      const response = await axios.get(`/api/bot/${id}`);
      setBot(response.data.bot);
      setFormData(response.data.bot);
    } catch (error) {
      console.error('Error fetching bot:', error);
      toast.error('Failed to load bot');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/bot/${id}`, formData);
      setBot({ ...bot, ...formData });
      setEditing(false);
      toast.success('Bot updated successfully!');
    } catch (error) {
      console.error('Error updating bot:', error);
      toast.error('Failed to update bot');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this bot? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`/api/bot/${id}`);
      toast.success('Bot deleted successfully!');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error deleting bot:', error);
      toast.error('Failed to delete bot');
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

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
      defaultResponses: [...(prev.defaultResponses || []), { question: '', answer: '' }]
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

  if (loading) {
    return (
      <BotDetailsContainer>
        <Container>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            fontSize: '18px',
            color: 'white'
          }}>
            Loading bot details...
          </div>
        </Container>
      </BotDetailsContainer>
    );
  }

  if (!bot) {
    return (
      <BotDetailsContainer>
        <Container>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            fontSize: '18px',
            color: 'white'
          }}>
            Bot not found
          </div>
        </Container>
      </BotDetailsContainer>
    );
  }

  return (
    <BotDetailsContainer>
      <Container>
        <Header>
          <Link to="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
          <h1>
            <Bot size={32} />
            {bot.name}
          </h1>
          <p>Manage your AI bot settings and track performance</p>
        </Header>

        <BotInfo>
          <div className="header">
            <h2>Bot Overview</h2>
            <div className="actions">
              <button
                onClick={() => setEditing(!editing)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Edit size={16} />
                {editing ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </div>
          
          <div className="details">
            <div className="detail-item">
              <div className="label">Status</div>
              <div className="value">
                {bot.settings.isActive ? '🟢 Active' : '🔴 Inactive'}
              </div>
            </div>
            <div className="detail-item">
              <div className="label">Total Messages</div>
              <div className="value">{bot.analytics.totalMessages}</div>
            </div>
            <div className="detail-item">
              <div className="label">Unique Fans</div>
              <div className="value">{bot.analytics.uniqueUsers}</div>
            </div>
            <div className="detail-item">
              <div className="label">Last Activity</div>
              <div className="value">
                {bot.analytics.lastActivity 
                  ? new Date(bot.analytics.lastActivity).toLocaleDateString()
                  : 'Never'
                }
              </div>
            </div>
          </div>
        </BotInfo>

        <Tabs>
          <Tab 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={16} />
            Settings
          </Tab>
          <Tab 
            active={activeTab === 'analytics'} 
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={16} />
            Analytics
          </Tab>
        </Tabs>

        <TabContent>
          {activeTab === 'settings' && (
            <>
              <FormGroup>
                <label htmlFor="name">Bot Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!editing}
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="greeting">Welcome Message</label>
                <textarea
                  id="greeting"
                  value={formData.greeting || ''}
                  onChange={(e) => handleChange('greeting', e.target.value)}
                  disabled={!editing}
                />
              </FormGroup>
              
              <FormGroup>
                <label>Public Link</label>
                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <input
                    type="text"
                    value={bot.settings.publicLink || ''}
                    readOnly
                    style={{
                      flex: 1,
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => copyToClipboard(bot.settings.publicLink)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      padding: '0.5rem',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    {copiedLink ? <CheckCircle size={16} /> : <Copy size={16} />}
                    {copiedLink ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </FormGroup>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <a
                  href={bot.settings.publicLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ExternalLink size={16} />
                  Test Bot
                </a>
              </div>
            </>
          )}
          
          {activeTab === 'analytics' && (
            <div>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>Analytics Dashboard</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
                {user.subscription.plan === 'pro' 
                  ? 'Detailed analytics for your bot performance'
                  : 'Upgrade to Pro to access detailed analytics'
                }
              </p>
              
              {user.subscription.plan !== 'pro' && (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <h4 style={{ color: 'white', marginBottom: '1rem' }}>Unlock Analytics</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem' }}>
                    Get detailed insights into your bot's performance with Pro
                  </p>
                  <Link
                    to="/subscription"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Upgrade to Pro
                  </Link>
                </div>
              )}
            </div>
          )}
        </TabContent>

        {editing && (
          <Actions>
            <button className="secondary" onClick={() => setEditing(false)}>
              <X size={20} />
              Cancel
            </button>
            <button className="primary" onClick={handleSave}>
              <Save size={20} />
              Save Changes
            </button>
            <button className="danger" onClick={handleDelete}>
              <Trash2 size={20} />
              Delete Bot
            </button>
          </Actions>
        )}
      </Container>
    </BotDetailsContainer>
  );
};

export default BotDetails;







