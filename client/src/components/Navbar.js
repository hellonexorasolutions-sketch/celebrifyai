import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, User, LogOut, Settings, BarChart3 } from 'lucide-react';

const Nav = styled.nav`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #f093fb;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #f093fb;
  }
  
  @media (max-width: 768px) {
    color: #374151;
    
    &:hover {
      color: #667eea;
    }
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  min-width: 200px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: #374151;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: #374151;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Button = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
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
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          🤖 Celebify.AI
        </Logo>
        
        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/#features">Features</NavLink>
          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Get Started</NavLink>
            </>
          )}
        </NavLinks>

        {user ? (
          <UserMenu>
            <UserButton onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <User size={20} />
            </UserButton>
            <Dropdown isOpen={isUserMenuOpen}>
              <DropdownItem to="/dashboard">
                <User size={16} />
                Dashboard
              </DropdownItem>
              <DropdownItem to="/subscription">
                <Settings size={16} />
                Subscription
              </DropdownItem>
              <DropdownButton onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </DropdownButton>
            </Dropdown>
          </UserMenu>
        ) : (
          <AuthButtons>
            <Button to="/login" className="secondary">Login</Button>
            <Button to="/register" className="primary">Get Started</Button>
          </AuthButtons>
        )}

        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;

