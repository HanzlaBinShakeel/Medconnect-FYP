"use client";
import React, { useState } from "react";
import { AppBar, Toolbar, Button, Typography, Container, Box, Grid, Card, CardContent, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import VideoCameraFrontRoundedIcon from '@mui/icons-material/VideoCameraFrontRounded';
import LocalPharmacyRoundedIcon from '@mui/icons-material/LocalPharmacyRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ScienceIcon from '@mui/icons-material/Science';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MedicationIcon from '@mui/icons-material/Medication';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AuthScreen from "./screens/auth/AuthScreen";
import EmergencyChatbot from "./components/EmergencyChatbot";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useRouter } from 'next/navigation';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EmergencyVideos from './components/EmergencyVideos';


// Styled Components
const NavBar = styled(AppBar)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 1000;
  padding: 0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  transition: all 0.3s ease;
  margin-left: -16px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  position: relative;
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  svg {
    font-size: 36px;
    background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 4px rgba(79, 70, 229, 0.2));
    @media (prefers-color-scheme: dark) {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      filter: drop-shadow(0 2px 4px rgba(99, 102, 241, 0.3));
    }
  }
`;

const LogoText = styled.div`
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.8px;
  background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(79, 70, 229, 0.15);
  font-family: 'Poppins', sans-serif;
  
  span {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HeroSection = styled.div`
  height: 87vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 72px; /* Account for navbar height */
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(240, 249, 255, 0.98) 0%,
      rgba(224, 242, 254, 0.95) 15%,
      rgba(224, 242, 254, 0.8) 30%,
      rgba(224, 242, 254, 0.5) 50%,
      rgba(224, 242, 254, 0.2) 70%,
      rgba(224, 242, 254, 0) 100%
    );
    z-index: 2;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  position: relative;
  z-index: 3;
`;

const HeroTitle = styled.h1`
  font-size: 56px;
  line-height: 1.2;
  font-family: 'Poppins', sans-serif;
  color: #1e40af;
  margin-bottom: 20px;

  span {
    font-weight: 900;
    letter-spacing: -0.5px;
  }

  strong {
    font-weight: 700;
    letter-spacing: -0.3px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  color: #475569;
  margin-bottom: 32px;
  line-height: 1.6;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
`;

const ButtonGroup = styled(Box)`
  display: flex;
  margin-left: 4px;
  gap: 8px;
  
  .MuiButton-root {
    font-size: 13px;
    font-weight: 600;
    padding: 6px 16px;
    min-width: 70px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    text-transform: none;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transform: translateX(-100%);
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    &:hover::before {
      transform: translateX(100%);
    }
  }
`;

const HeroButtonGroup = styled(Box)`
  display: flex;
  gap: 12px;
  margin-top: 24px;

  .MuiButton-root {
    font-size: 14px;
    font-weight: 500;
    padding: 8px 20px;
    border-radius: 6px;
    font-family: 'Poppins', sans-serif;
  }
`;

const EmergencyAmbulanceButton = styled(motion.button)`
  position: fixed;
  bottom: 40px;
  right: 20px;
  transform: none;
  background: linear-gradient(135deg, #ff4d4d 0%, #ff1a1a 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(255, 26, 26, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(255, 26, 26, 0.4);
    background: linear-gradient(135deg, #ff1a1a 0%, #e60000 100%);
  }

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 40px;
    background: linear-gradient(135deg, #ff4d4d 0%, #ff1a1a 100%);
    z-index: -1;
    animation: pulse 2s infinite;
    opacity: 0.5;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.2;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }
`;

const EmergencyButton = styled(motion.button)`
  position: fixed;
  bottom: 40px;
  right: 20px;
  transform: none;
  background: linear-gradient(135deg, #ff4d4d 0%, #ff1a1a 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(255, 26, 26, 0.3);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1000;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(255, 26, 26, 0.4);
    background: linear-gradient(135deg, #ff1a1a 0%, #e60000 100%);
  }

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50px;
    background: linear-gradient(135deg, #ff4d4d 0%, #ff1a1a 100%);
    z-index: -1;
    animation: pulse 2s infinite;
    opacity: 0.5;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.2;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }
`;

const FeatureCard = styled(motion.create(Card))`
  height: 100%;
  border-radius: 16px;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 220px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(79, 70, 229, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
`;

const FeatureIcon = styled(motion.create('div'))`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
  
  svg {
    font-size: 32px;
    color: white;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
`;

const FeatureTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 12px;
  font-family: 'Poppins', sans-serif;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 32px;
    height: 2px;
    background: linear-gradient(90deg, #4f46e5, #6366f1);
    border-radius: 2px;
  }
`;

const FeatureDescription = styled(Typography)`
  color: #475569;
  font-size: 14px;
  line-height: 1.5;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
`;

const NavLink = styled(motion.create('button'))`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  background: none;
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  position: relative;
  
  svg {
    font-size: 20px;
    color: #4f46e5;
  }
  
  &:hover {
    color: #4f46e5;
    background: rgba(79, 70, 229, 0.04);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #4f46e5;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover::after {
    width: 80%;
  }
`;

const Footer = styled.footer`
  background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
  color: white;
  padding: 64px 0 32px;
  margin-top: 64px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FooterTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  font-family: 'Poppins', sans-serif;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Poppins', sans-serif;

  &:hover {
    color: white;
    transform: translateX(4px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

const SocialIcon = styled(motion.create('a'))`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }

  svg {
    font-size: 20px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-family: 'Poppins', sans-serif;

  svg {
    font-size: 20px;
    color: white;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 32px;
  margin-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
`;

const NavButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #4b5563;
  font-weight: 500;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  text-transform: none;
  margin: 0 2px;
  min-width: auto;
  
  svg {
    font-size: 18px;
    color: #4f46e5;
  }
  
  &:hover {
    color: #4f46e5;
    background: rgba(79, 70, 229, 0.04);
  }
`;

const NavButtonGroup = styled(Box)`
  display: flex;
  align-items: center;
  margin-right: 8px;
  margin-left: auto;
  padding-right: 16px;
`;

const BlogCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const VideoCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${VideoCard}:hover & {
    opacity: 1;
  }
`;

export default function Home() {
  const router = useRouter();
  const [showAuthScreen, setShowAuthScreen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleLoginClick = () => {
    setIsLogin(true);
    setShowAuthScreen(true);
  };

  const handleRegisterClick = () => {
    setShowAuthScreen(true);
    setIsLogin(false);
  };

  const handleHomeClick = () => {
    setShowAuthScreen(false);
  };

  const handleChatbotClose = () => {
    setIsChatbotOpen(false);
  };

  const handleHomeNavigation = () => {
    setShowAuthScreen(false);
    setAnimationKey(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultationClick = () => {
    router.push('/consultation');
  };

  const handlePharmacyClick = () => {
    router.push('/pharmacy');
  };

  const handleLaboratoryClick = () => {
    router.push('/laboratory');
  };

  const handleAmbulanceClick = () => {
    router.push('/ambulance');
  };

  return (
    <div key={animationKey}>
      <NavBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo>
              <IconContainer>
                <IconWrapper>
                  <HealthAndSafetyIcon />
                </IconWrapper>
              </IconContainer>
              <LogoText>
                Med<span>Connect</span>
              </LogoText>
            </Logo>
            <Box sx={{ flexGrow: 1 }} />
            <NavButtonGroup>
              <NavButton startIcon={<HomeRoundedIcon />} onClick={handleHomeNavigation}>
                Home
              </NavButton>
              <NavButton startIcon={<SmartToyIcon />} onClick={() => setIsChatbotOpen(true)}>
                AI Chat
              </NavButton>
              <NavButton startIcon={<VideoCameraFrontRoundedIcon />} onClick={handleConsultationClick}>
                Consultation
              </NavButton>
              <NavButton startIcon={<LocalPharmacyRoundedIcon />} onClick={handlePharmacyClick}>
                E-Pharmacy
              </NavButton>
              <NavButton startIcon={<ScienceIcon />} onClick={handleLaboratoryClick}>
                E-Laboratory
              </NavButton>
              <NavButton startIcon={<LocalShippingIcon />} onClick={handleAmbulanceClick}>
                Ambulance
              </NavButton>
            </NavButtonGroup>
            <Button
              color="inherit"
              onClick={handleLoginClick}
              sx={{
                color: '#4f46e5',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(79, 70, 229, 0.1)',
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={handleRegisterClick}
              sx={{
                ml: 2,
                backgroundColor: '#4f46e5',
                '&:hover': {
                  backgroundColor: '#3730a3',
                },
              }}
            >
              Sign Up
            </Button>
          </Toolbar>
        </Container>
      </NavBar>

      {showAuthScreen ? (
        <AuthScreen open={showAuthScreen} onClose={handleHomeClick} isLogin={isLogin} />
      ) : (
        <HeroSection>
          <HeroBackground>
            <motion.div
              key="hero-bg"
              initial={{ opacity: 0, scale: 1.2, rotate: -2 }}
              animate={{ opacity: 0.95, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              style={{ width: "100%", height: "100%" }}
            >
              <Image
                src="/images/Healthcare_Evergreen - Telemedicine equipment.svg"
                alt="Healthcare Illustration"
                fill
                style={{ 
                  objectFit: "cover",
                  opacity: 0.95
                }}
                priority
              />
            </motion.div>
          </HeroBackground>
          <Container maxWidth="lg" sx={{ height: '100%', position: 'relative', zIndex: 3 }}>
            <Grid container spacing={4} alignItems="center" sx={{ height: '100%' }}>
              <Grid item xs={12} md={6}>
                <motion.div
                  key="hero-content"
                  initial={{ opacity: 0, y: 50, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <HeroTitle>
                    <motion.span
                      key="title-1"
                      initial={{ opacity: 0, y: 30, x: -20 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ 
                        delay: 0.5,
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      MEDCONNECT
                    </motion.span>
                    <br />
                    <motion.strong
                      key="title-2"
                      initial={{ opacity: 0, y: 30, x: -20 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ 
                        delay: 0.7,
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      A Virtual Clinic Bringing Specialized
                    </motion.strong>
                    <br />
                    <motion.strong
                      key="title-3"
                      initial={{ opacity: 0, y: 30, x: -20 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ 
                        delay: 0.9,
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      Healthcare
                    </motion.strong>
                  </HeroTitle>
                  <motion.div
                    key="subtitle"
                    initial={{ opacity: 0, y: 30, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ 
                      delay: 1.1,
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <HeroSubtitle>
                      Use MedConnect to access expert healthcare services from anywhere, anytime.
                    </HeroSubtitle>
                  </motion.div>
                  <motion.div
                    key="buttons"
                    initial={{ opacity: 0, y: 30, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ 
                      delay: 1.3,
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <HeroButtonGroup>
                      <Button 
                        variant="contained" 
                        sx={{ 
                          bgcolor: "#0095ff",
                          "&:hover": {
                            bgcolor: "#0085ee"
                          }
                        }}
                      >
                        BOOK APPOINTMENT
                      </Button>
                      <Button 
                        variant="outlined"
                        sx={{
                          borderColor: "#0095ff",
                          color: "#0095ff",
                          "&:hover": {
                            borderColor: "#0085ee",
                            color: "#0085ee"
                          }
                        }}
                      >
                        FIND DOCTOR
                      </Button>
                    </HeroButtonGroup>
                  </motion.div>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
          <EmergencyAmbulanceButton
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            onClick={handleAmbulanceClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ bottom: '120px' }}
          >
            <LocalHospitalRoundedIcon sx={{ fontSize: 20 }} />
            Emergency Ambulance
          </EmergencyAmbulanceButton>
          <EmergencyButton
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            onClick={() => setIsChatbotOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SmartToyIcon sx={{ fontSize: 24 }} />
            Emergency Help
          </EmergencyButton>
        </HeroSection>
      )}
      <EmergencyChatbot isOpen={isChatbotOpen} onClose={handleChatbotClose} />

      <EmergencyVideos />

      {/* Healthy Blogs Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ 
            fontWeight: 700, 
            color: '#1e40af',
            mb: 2,
            fontFamily: 'Poppins, sans-serif'
          }}>
            Health & Wellness Insights
          </Typography>
          <Typography variant="subtitle1" sx={{ 
            color: '#64748b',
            maxWidth: '600px',
            mx: 'auto',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Stay informed with our latest health tips, medical advice, and wellness insights
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Link href="/blogs/covid-19" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderRadius: '12px',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                }
              }}>
                <Box sx={{ position: 'relative', height: 200 }}>
                  <Image
                    src="https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-4.0.3"
                    alt="COVID-19 Prevention"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    mb: 1,
                    fontFamily: 'Poppins, sans-serif',
                    color: '#1e40af'
                  }}>
                    COVID-19: Latest Prevention Guidelines
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    According to WHO and CDC guidelines, stay protected with updated vaccination schedules, proper mask usage, and social distancing practices...
                  </Typography>
                  <Button 
                    variant="text" 
                    color="primary"
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: 600,
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <Link href="/blogs/pregnancy-care" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderRadius: '12px',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                }
              }}>
                <Box sx={{ position: 'relative', height: 200 }}>
                  <Image
                    src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3"
                    alt="Pregnancy Care"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    mb: 1,
                    fontFamily: 'Poppins, sans-serif',
                    color: '#1e40af'
                  }}>
                    Essential Pregnancy Care Guide
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Expert advice from Mayo Clinic on prenatal nutrition, safe exercises, and important milestones...
                  </Typography>
                  <Button 
                    variant="text" 
                    color="primary"
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: 600,
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <Link href="/blogs/mental-health" style={{ textDecoration: 'none', display: 'block' }}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderRadius: '12px',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                }
              }}>
                <Box sx={{ position: 'relative', height: 200 }}>
                  <Image
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3"
                    alt="Mental Health"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    mb: 1,
                    fontFamily: 'Poppins, sans-serif',
                    color: '#1e40af'
                  }}>
                    Mental Health & Well-being
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Insights from the American Psychological Association on managing stress, anxiety, and depression...
                  </Typography>
                  <Button 
                    variant="text" 
                    color="primary"
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: 600,
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                }
              }}
              onClick={() => router.push('/blogs/nutrition')}
            >
              <Box sx={{ position: 'relative', height: 200 }}>
                <Image
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3"
                  alt="Nutrition"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  mb: 1,
                  fontFamily: 'Poppins, sans-serif',
                  color: '#1e40af'
                }}>
                  Nutrition & Healthy Eating
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Harvard Medical School's guide to balanced nutrition, superfoods, and meal planning. Learn about the latest dietary guidelines and how to maintain a healthy lifestyle...
                </Typography>
                <Button 
                  variant="text" 
                  color="primary"
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 600,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Read More →
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                }
              }}
              onClick={() => router.push('/blogs/fitness')}
            >
              <Box sx={{ position: 'relative', height: 200 }}>
                <Image
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3"
                  alt="Exercise"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  mb: 1,
                  fontFamily: 'Poppins, sans-serif',
                  color: '#1e40af'
                }}>
                  Fitness & Exercise Guide
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  American Heart Association's recommendations for physical activity and exercise routines. Discover workout plans for different fitness levels and health benefits...
                </Typography>
                <Button 
                  variant="text" 
                  color="primary"
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 600,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Read More →
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                }
              }}
              onClick={() => router.push('/blogs/sleep-health')}
            >
              <Box sx={{ position: 'relative', height: 200 }}>
                <Image
                  src="https://images.unsplash.com/photo-1511295742362-92c96b1cf484?ixlib=rb-4.0.3"
                  alt="Sleep Health"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  mb: 1,
                  fontFamily: 'Poppins, sans-serif',
                  color: '#1e40af'
                }}>
                  Sleep Health & Wellness
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  National Sleep Foundation's guide to better sleep habits and quality rest. Learn about sleep cycles, common disorders, and tips for improving your sleep...
                </Typography>
                <Button 
                  variant="text" 
                  color="primary"
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 600,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Read More →
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ py: 8, bgcolor: "white" }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h3" 
              align="center" 
              sx={{ 
                mb: 6, 
                color: "#1e40af",
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              Why Choose MedConnect?
            </Typography>
          </motion.div>
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 3,
              justifyContent: 'center',
              maxWidth: '1400px',
              margin: '0 auto',
              px: 2
            }}
          >
            {[
              {
                title: "Emergency AI Chatbot",
                description: "Get instant medical assistance with our AI-powered chatbot. Available 24/7 to provide quick medical guidance and emergency support.",
                icon: <SmartToyIcon />,
                delay: 0.2,
                color: "#4f46e5"
              },
              {
                title: "Electronic Health Record",
                description: "Access and manage your complete medical history digitally. Keep track of your health records, appointments, and treatments in one secure place.",
                icon: <DescriptionIcon />,
                delay: 0.4,
                color: "#4f46e5"
              },
              {
                title: "E-prescription",
                description: "Receive digital prescriptions from your doctors. Easily share them with pharmacies and track your medication history.",
                icon: <LocalPharmacyRoundedIcon />,
                delay: 0.6,
                color: "#4f46e5"
              },
              {
                title: "Recorded Videos",
                description: "Watch recorded medical consultations and educational content. Access valuable health information at your convenience.",
                icon: <VideoLibraryIcon />,
                delay: 0.8,
                color: "#4f46e5"
              },
              {
                title: "Ambulance Booking",
                description: "Quick and easy emergency ambulance booking. Track your ambulance in real-time and get immediate medical assistance.",
                icon: <LocalShippingIcon />,
                delay: 1.0,
                color: "#4f46e5"
              },
              {
                title: "Laboratory Booking",
                description: "Book diagnostic tests and laboratory services online. Get your test results digitally and share them with your healthcare providers.",
                icon: <ScienceIcon />,
                delay: 1.2,
                color: "#4f46e5"
              },
              {
                title: "Medical Document Uploader",
                description: "Securely upload and store your medical documents, reports, and images. Access them anytime, anywhere.",
                icon: <UploadFileIcon />,
                delay: 1.4,
                color: "#4f46e5"
              },
              {
                title: "Expert Health Community",
                description: "Connect with healthcare professionals and patients. Share experiences, get advice, and learn from medical experts in our community.",
                icon: <GroupsIcon />,
                delay: 1.6,
                color: "#4f46e5"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
              >
                <FeatureCard
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: feature.delay + 0.2 }}
                    >
                      <FeatureIcon
                        style={{
                          background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`
                        }}
                      >
                        {feature.icon}
                      </FeatureIcon>
                    </motion.div>
                    <FeatureTitle variant="h5">
                      {feature.title}
                    </FeatureTitle>
                    <FeatureDescription>
                      {feature.description}
                    </FeatureDescription>
                  </CardContent>
                </FeatureCard>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      <Footer>
        <Container>
          <FooterContent>
            <FooterColumn>
              <FooterTitle>About MedConnect</FooterTitle>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', lineHeight: '1.6', fontFamily: "'Poppins', sans-serif" }}>
                MedConnect is your trusted partner in healthcare, providing accessible and quality medical services through our innovative digital platform.
              </Typography>
              <SocialLinks>
                <SocialIcon href="#" whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                  <FacebookIcon />
                </SocialIcon>
                <SocialIcon href="#" whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                  <TwitterIcon />
                </SocialIcon>
                <SocialIcon href="#" whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                  <InstagramIcon />
                </SocialIcon>
                <SocialIcon href="#" whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                  <LinkedInIcon />
                </SocialIcon>
              </SocialLinks>
            </FooterColumn>

            <FooterColumn>
              <FooterTitle>Quick Links</FooterTitle>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/services">Our Services</FooterLink>
              <FooterLink href="/doctors">Find Doctors</FooterLink>
              <FooterLink href="/appointments">Book Appointment</FooterLink>
              <FooterLink href="/pharmacy">E-Pharmacy</FooterLink>
              <FooterLink href="/community">Health Community</FooterLink>
            </FooterColumn>

            <FooterColumn>
              <FooterTitle>Services</FooterTitle>
              <FooterLink href="/telemedicine">Telemedicine & E-Pharmacy</FooterLink>
              <FooterLink href="/e-prescription">E-Prescription</FooterLink>
              <FooterLink href="/health-records">Health Records</FooterLink>
              <FooterLink href="/ambulance">Ambulance Service</FooterLink>
              <FooterLink href="/laboratory">Laboratory Tests</FooterLink>
              <FooterLink href="/document-upload">Document Upload</FooterLink>
            </FooterColumn>

            <FooterColumn>
              <FooterTitle>Contact Us</FooterTitle>
              <ContactInfo>
                <ContactItem>
                  <LocationOnIcon />
                  <span>Kasur Punjab,Pakistan</span>
                </ContactItem>
                <ContactItem>
                  <PhoneIcon />
                  <span>+92 330 6665363</span>
                </ContactItem>
                <ContactItem>
                  <EmailIcon />
                  <span>service.medconnect@gmail.com</span>
                </ContactItem>
              </ContactInfo>
            </FooterColumn>
          </FooterContent>

          <FooterBottom>
            <Typography>
              © {new Date().getFullYear()} MedConnect. All rights reserved.
            </Typography>
          </FooterBottom>
        </Container>
      </Footer>
    </div>
  );
}
