import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    font-size: ${props => props.theme.fontSizes.base};
    font-weight: ${props => props.theme.fontWeights.normal};
    line-height: 1.6;
    color: ${props => props.theme.colors.textPrimary};
    background: ${props => props.theme.colors.background};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${props => props.theme.fontWeights.semibold};
    line-height: 1.2;
    margin-bottom: ${props => props.theme.spacing.md};
  }

  h1 {
    font-size: ${props => props.theme.fontSizes['4xl']};
  }

  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }

  h3 {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }

  h4 {
    font-size: ${props => props.theme.fontSizes.xl};
  }

  h5 {
    font-size: ${props => props.theme.fontSizes.lg};
  }

  h6 {
    font-size: ${props => props.theme.fontSizes.base};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
    
    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }

  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: 1px solid ${props => props.theme.colors.gray300};
    border-radius: ${props => props.theme.borderRadius.md};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    transition: ${props => props.theme.transitions.fast};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }

  button {
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    border: none;
    border-radius: ${props => props.theme.borderRadius.md};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
    transition: ${props => props.theme.transitions.fast};
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.gray100};
    border-radius: ${props => props.theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.gray400};
    border-radius: ${props => props.theme.borderRadius.sm};
    
    &:hover {
      background: ${props => props.theme.colors.gray500};
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out;
  }

  .slide-in {
    animation: slideIn 0.3s ease-out;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  /* Utility classes */
  .text-gradient {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glass {
    background: ${props => props.theme.colors.glass};
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .shadow-glass {
    box-shadow: ${props => props.theme.shadows.glass};
  }

  /* Loading skeleton */
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
  }
`;






