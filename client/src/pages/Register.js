import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { Bot, User, Mail, Lock, Eye, EyeOff, CheckCircle, Github } from 'lucide-react';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
`;

const RegisterCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  p {
    color: #6b7280;
    font-size: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  
  .icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    z-index: 1;
  }
  
  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
  
  .password-toggle {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    cursor: pointer;
    z-index: 1;
    
    &:hover {
      color: #6b7280;
    }
  }
`;

const PasswordRequirements = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 0.5rem;
  
  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    
    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: #6b7280;
      margin-bottom: 0.25rem;
      
      .check {
        color: #10b981;
      }
      
      .cross {
        color: #ef4444;
      }
    }
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
  
  span {
    padding: 0 1rem;
    color: #6b7280;
    font-size: 0.875rem;
  }
`;

const OAuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const OAuthButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  color: #374151;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  
  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
  
  &.google {
    background: #4285f4;
    color: white;
    border-color: #4285f4;
    
    &:hover {
      background: #3367d6;
    }
  }
  
  &.github {
    background: #24292e;
    color: white;
    border-color: #24292e;
    
    &:hover {
      background: #1a1e22;
    }
  }
  
  &.apple {
    background: #000000;
    color: white;
    border-color: #000000;
    
    &:hover {
      background: #333333;
    }
  }
`;

const LinkText = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  
  p {
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      color: #764ba2;
    }
  }
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password)
    };
    return requirements;
  };

  const passwordRequirements = validatePassword(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password requirements
    const requirements = validatePassword(formData.password);
    if (!requirements.length || !requirements.uppercase || !requirements.lowercase || !requirements.number) {
      setError('Password does not meet requirements');
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData.name, formData.email, formData.password);
      
      if (result.success) {
        toast.success('Account created successfully!');
        navigate('/dashboard');
      } else {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>
          <h1>
            <Bot size={28} />
            Celebify.AI
          </h1>
          <p>Create your free account</p>
        </Logo>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <OAuthButtons>
          <OAuthButton 
            className="google" 
            type="button"
            onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </OAuthButton>
          
          <OAuthButton 
            className="github" 
            type="button"
            onClick={() => window.location.href = 'http://localhost:5000/api/auth/github'}
          >
            <Github size={20} />
            Sign up with GitHub
          </OAuthButton>
        </OAuthButtons>

        <Divider>
          <span>or</span>
        </Divider>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <User size={20} className="icon" />
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Mail size={20} className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Lock size={20} className="icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {showPassword ? (
              <EyeOff 
                size={20} 
                className="password-toggle"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye 
                size={20} 
                className="password-toggle"
                onClick={() => setShowPassword(true)}
              />
            )}
          </InputGroup>

          {formData.password && (
            <PasswordRequirements>
              <h4>Password Requirements:</h4>
              <ul>
                <li>
                  {passwordRequirements.length ? (
                    <CheckCircle size={12} className="check" />
                  ) : (
                    <span className="cross">✗</span>
                  )}
                  At least 6 characters
                </li>
                <li>
                  {passwordRequirements.uppercase ? (
                    <CheckCircle size={12} className="check" />
                  ) : (
                    <span className="cross">✗</span>
                  )}
                  One uppercase letter
                </li>
                <li>
                  {passwordRequirements.lowercase ? (
                    <CheckCircle size={12} className="check" />
                  ) : (
                    <span className="cross">✗</span>
                  )}
                  One lowercase letter
                </li>
                <li>
                  {passwordRequirements.number ? (
                    <CheckCircle size={12} className="check" />
                  ) : (
                    <span className="cross">✗</span>
                  )}
                  One number
                </li>
              </ul>
            </PasswordRequirements>
          )}

          <InputGroup>
            <Lock size={20} className="icon" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {showConfirmPassword ? (
              <EyeOff 
                size={20} 
                className="password-toggle"
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <Eye 
                size={20} 
                className="password-toggle"
                onClick={() => setShowConfirmPassword(true)}
              />
            )}
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </Form>

        <Divider>
          <span>Already have an account?</span>
        </Divider>

        <LinkText>
          <p>Sign in to your existing account</p>
          <Link to="/login">Sign in here</Link>
        </LinkText>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;

