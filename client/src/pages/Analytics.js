import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { 
  BarChart3, 
  MessageCircle, 
  Users, 
  TrendingUp,
  Clock,
  ArrowLeft,
  Crown
} from 'lucide-react';

const AnalyticsContainer = styled.div`
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

const ChartsSection = styled.div`
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
  }
`;

const TopQuestions = styled.div`
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
  }
`;

const QuestionItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .question {
    color: white;
    font-weight: 500;
    flex: 1;
  }
  
  .count {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
  }
`;

const UpgradePrompt = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  
  .icon {
    width: 60px;
    height: 60px;
    border-radius: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: white;
  }
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
    
    .feature {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      padding: 1rem;
      text-align: center;
      
      h4 {
        color: white;
        font-size: 0.875rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
      }
      
      p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.75rem;
        margin: 0;
      }
    }
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

const Analytics = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.subscription.plan === 'pro') {
      fetchAnalytics();
    } else {
      setLoading(false);
    }
  }, [id, user.subscription.plan]);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`/api/analytics/bot/${id}`);
      setAnalytics(response.data.analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AnalyticsContainer>
        <Container>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            fontSize: '18px',
            color: 'white'
          }}>
            Loading analytics...
          </div>
        </Container>
      </AnalyticsContainer>
    );
  }

  if (user.subscription.plan !== 'pro') {
    return (
      <AnalyticsContainer>
        <Container>
          <Header>
            <Link to={`/bot/${id}`} className="back-link">
              <ArrowLeft size={20} />
              Back to Bot
            </Link>
            <h1>
              <BarChart3 size={32} />
              Analytics Dashboard
            </h1>
            <p>Unlock detailed insights about your bot's performance</p>
          </Header>

          <UpgradePrompt>
            <div className="icon">
              <Crown size={24} />
            </div>
            <h2>Unlock Advanced Analytics</h2>
            <p>
              Get detailed insights into your bot's performance, fan engagement, 
              and popular questions with Pro analytics.
            </p>
            
            <div className="features">
              <div className="feature">
                <h4>📊 Detailed Metrics</h4>
                <p>Track messages, users, and engagement over time</p>
              </div>
              <div className="feature">
                <h4>🔥 Top Questions</h4>
                <p>See what fans ask most frequently</p>
              </div>
              <div className="feature">
                <h4>📈 Growth Insights</h4>
                <p>Understand your audience and optimize content</p>
              </div>
              <div className="feature">
                <h4>💬 Chat History</h4>
                <p>Review conversations and improve responses</p>
              </div>
            </div>
            
            <Link to="/subscription">
              <Crown size={20} />
              Upgrade to Pro
            </Link>
          </UpgradePrompt>
        </Container>
      </AnalyticsContainer>
    );
  }

  return (
    <AnalyticsContainer>
      <Container>
        <Header>
          <Link to={`/bot/${id}`} className="back-link">
            <ArrowLeft size={20} />
            Back to Bot
          </Link>
          <h1>
            <BarChart3 size={32} />
            Analytics Dashboard
          </h1>
          <p>Track your bot's performance and fan engagement</p>
        </Header>

        <StatsGrid>
          <StatCard>
            <div className="icon">
              <MessageCircle size={24} />
            </div>
            <div className="content">
              <h3>{analytics?.overview?.totalMessages || 0}</h3>
              <p>Total Messages</p>
            </div>
          </StatCard>
          
          <StatCard>
            <div className="icon">
              <Users size={24} />
            </div>
            <div className="content">
              <h3>{analytics?.overview?.uniqueUsers || 0}</h3>
              <p>Unique Fans</p>
            </div>
          </StatCard>
          
          <StatCard>
            <div className="icon">
              <TrendingUp size={24} />
            </div>
            <div className="content">
              <h3>{analytics?.recentActivity?.messagesLast7Days || 0}</h3>
              <p>Messages (7 days)</p>
            </div>
          </StatCard>
          
          <StatCard>
            <div className="icon">
              <Clock size={24} />
            </div>
            <div className="content">
              <h3>{analytics?.recentActivity?.activeChats || 0}</h3>
              <p>Active Chats</p>
            </div>
          </StatCard>
        </StatsGrid>

        <TopQuestions>
          <h2>Top Questions</h2>
          {analytics?.topQuestions?.length > 0 ? (
            analytics.topQuestions.map((qa, index) => (
              <QuestionItem key={index}>
                <div className="question">{qa.question}</div>
                <div className="count">{qa.count} times</div>
              </QuestionItem>
            ))
          ) : (
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
              No questions yet. Start chatting to see analytics!
            </p>
          )}
        </TopQuestions>

        <ChartsSection>
          <h2>Recent Activity</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem' }}>
            Your bot has been active and engaging with fans. Keep up the great work!
          </p>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>📈 Growth Chart</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Detailed charts and trends will be available in future updates.
              For now, you can see your key metrics above.
            </p>
          </div>
        </ChartsSection>
      </Container>
    </AnalyticsContainer>
  );
};

export default Analytics;








