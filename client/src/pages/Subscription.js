import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { 
  Crown, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  CreditCard,
  Shield,
  Star,
  Users,
  MessageCircle,
  BarChart3,
  ExternalLink
} from 'lucide-react';

const SubscriptionContainer = styled.div`
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

const CurrentPlan = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 3rem;
  text-align: center;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .plan-info {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
  }
  
  .info-item {
    text-align: center;
    
    .number {
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
      margin: 0;
    }
    
    .label {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.875rem;
      margin: 0;
    }
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const PricingCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
  
  &.featured {
    border: 2px solid #f093fb;
    transform: scale(1.05);
    
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      font-weight: 600;
    }
  }
  
  .header {
    margin-bottom: 2rem;
    
    .icon {
      width: 60px;
      height: 60px;
      border-radius: 1rem;
      background: ${props => props.plan === 'pro' 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
        : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      };
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      color: white;
    }
    
    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: white;
      margin-bottom: 0.5rem;
    }
    
    .price {
      font-size: 3rem;
      font-weight: 700;
      color: white;
      margin-bottom: 0.5rem;
      
      .period {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }
    
    .description {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1rem;
    }
  }
  
  .features {
    list-style: none;
    margin: 2rem 0;
    padding: 0;
    
    li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 0.75rem;
      text-align: left;
      
      .check {
        color: #10b981;
        flex-shrink: 0;
      }
    }
  }
  
  .button {
    width: 100%;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-decoration: none;
    border: none;
    
    &.primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
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
    
    &.current {
      background: rgba(16, 185, 129, 0.2);
      color: #10b981;
      border: 1px solid #10b981;
      cursor: default;
    }
  }
`;

const FeaturesComparison = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 3rem;
  
  h2 {
    font-size: 1.875rem;
    font-weight: 600;
    color: white;
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const ComparisonTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TableHeader = styled.div`
  font-weight: 600;
  color: white;
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  
  &.feature {
    text-align: left;
  }
`;

const TableCell = styled.div`
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &.feature {
    text-align: left;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .check {
    color: #10b981;
  }
  
  .cross {
    color: #ef4444;
  }
`;

const Subscription = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would redirect to PayPal
      const response = await axios.post('/api/subscription/upgrade');
      updateUser(response.data.subscription);
      toast.success('Successfully upgraded to Pro!');
    } catch (error) {
      console.error('Upgrade error:', error);
      toast.error('Failed to upgrade subscription');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/subscription/cancel');
      updateUser(response.data.subscription);
      toast.success('Subscription cancelled');
    } catch (error) {
      console.error('Cancel error:', error);
      toast.error('Failed to cancel subscription');
    } finally {
      setLoading(false);
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

  return (
    <SubscriptionContainer>
      <Container>
        <Header>
          <h1>Choose Your Plan</h1>
          <p>Start free, upgrade when you're ready to scale</p>
        </Header>

        <CurrentPlan>
          <h2>
            {user.subscription.plan === 'pro' ? (
              <>
                <Crown size={24} />
                Your Pro Plan
              </>
            ) : (
              <>
                <Zap size={24} />
                Your Free Plan
              </>
            )}
          </h2>
          <div className="plan-info">
            <div className="info-item">
              <p className="number">{getUsageText()}</p>
              <p className="label">This Month</p>
            </div>
            <div className="info-item">
              <p className="number">{user.subscription.plan === 'pro' ? 'Unlimited' : '50'}</p>
              <p className="label">Monthly Limit</p>
            </div>
            <div className="info-item">
              <p className="number">{user.subscription.plan === 'pro' ? 'All' : 'Basic'}</p>
              <p className="label">Features</p>
            </div>
          </div>
        </CurrentPlan>

        <PricingGrid>
          <PricingCard plan="free">
            <div className="header">
              <div className="icon">
                <Zap size={24} />
              </div>
              <h3>Free</h3>
              <div className="price">
                $0<span className="period">/month</span>
              </div>
              <p className="description">Perfect for getting started</p>
            </div>
            <ul className="features">
              <li>
                <CheckCircle size={16} className="check" />
                50 messages per month
              </li>
              <li>
                <CheckCircle size={16} className="check" />
                Basic AI personality
              </li>
              <li>
                <CheckCircle size={16} className="check" />
                Watermark visible
              </li>
              <li>
                <CheckCircle size={16} className="check" />
                Shared link only
              </li>
            </ul>
            <button 
              className={user.subscription.plan === 'free' ? 'current' : 'secondary'}
              disabled={user.subscription.plan === 'free'}
            >
              {user.subscription.plan === 'free' ? 'Current Plan' : 'Downgrade'}
            </button>
          </PricingCard>

          <PricingCard plan="pro" className="featured">
            <div className="header">
              <div className="icon">
                <Crown size={24} />
              </div>
              <h3>Pro</h3>
              <div className="price">
                $29<span className="period">/month</span>
              </div>
              <p className="description">For serious creators</p>
            </div>
            <ul className="features">
              <li>
                <CheckCircle size={16} className="check" />
                Unlimited messages
              </li>
              <li>
                <CheckCircle size={16} className="check" />
                Advanced AI personality
              </li>
              <li>
                <CheckCircle size={16} className="check" />
                No watermark
              </li>
              <li>
                <CheckCircle size={16} className="check" />
                Custom learning
              </li>
              <li>
                <CheckCircle size={16} className="check" />
                Analytics dashboard
              </li>
              <li>
                <CheckCircle size={16} className="check" />
                Embed anywhere
              </li>
            </ul>
            {user.subscription.plan === 'pro' ? (
              <button 
                className="current"
                onClick={handleCancel}
                disabled={loading}
              >
                {loading ? 'Cancelling...' : 'Cancel Subscription'}
              </button>
            ) : (
              <button 
                className="primary"
                onClick={handleUpgrade}
                disabled={loading}
              >
                {loading ? 'Upgrading...' : 'Upgrade to Pro'}
                <ArrowRight size={20} />
              </button>
            )}
          </PricingCard>
        </PricingGrid>

        <FeaturesComparison>
          <h2>Feature Comparison</h2>
          <ComparisonTable>
            <TableHeader className="feature">Feature</TableHeader>
            <TableHeader>Free</TableHeader>
            <TableHeader>Pro</TableHeader>
            
            <TableCell className="feature">Monthly Messages</TableCell>
            <TableCell>50</TableCell>
            <TableCell>Unlimited</TableCell>
            
            <TableCell className="feature">AI Personality</TableCell>
            <TableCell>Basic</TableCell>
            <TableCell>Advanced</TableCell>
            
            <TableCell className="feature">Watermark</TableCell>
            <TableCell>
              <CheckCircle size={16} className="cross" />
            </TableCell>
            <TableCell>
              <CheckCircle size={16} className="check" />
            </TableCell>
            
            <TableCell className="feature">Custom Learning</TableCell>
            <TableCell>
              <CheckCircle size={16} className="cross" />
            </TableCell>
            <TableCell>
              <CheckCircle size={16} className="check" />
            </TableCell>
            
            <TableCell className="feature">Analytics</TableCell>
            <TableCell>
              <CheckCircle size={16} className="cross" />
            </TableCell>
            <TableCell>
              <CheckCircle size={16} className="check" />
            </TableCell>
            
            <TableCell className="feature">Embed Widget</TableCell>
            <TableCell>
              <CheckCircle size={16} className="cross" />
            </TableCell>
            <TableCell>
              <CheckCircle size={16} className="check" />
            </TableCell>
          </ComparisonTable>
        </FeaturesComparison>
      </Container>
    </SubscriptionContainer>
  );
};

export default Subscription;







