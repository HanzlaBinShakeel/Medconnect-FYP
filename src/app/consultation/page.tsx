"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Chip,
  useTheme
} from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import EmergencyIcon from "@mui/icons-material/MedicalServices";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import EmergencyChatbot from "../components/EmergencyChatbot";
import VideoConsultationScreen from "../components/VideoConsultationScreen";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PhoneIcon from "@mui/icons-material/Phone";
import RefreshIcon from "@mui/icons-material/Refresh";

// Define the Doctor type
interface Doctor {
  id: string;
  name: string;
  specialization: string;
  phone: string;
  experience: string;
  email: string;
  licenseNumber: string;
  availability: string;
}

const StyledCard = styled(motion.create(Card))`
  height: 100%;
  border-radius: 16px;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  overflow: hidden;
  
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

const StyledIconButton = styled(motion.create(IconButton))`
  background-color: #4f46e5;
  color: white;
  margin-bottom: 8px;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  
  &:hover {
    background-color: #3730a3;
    transform: scale(1.05);
  }
`;

const EmergencyButton = styled(motion.create(Button))`
  background-color: #ef4444;
  color: white;
  border-radius: 20px;
  padding: 8px 16px;
  text-transform: none;
  font-weight: 600;
  
  &:hover {
    background-color: #dc2626;
    transform: scale(1.02);
  }
`;

const DoctorCard = styled(motion.create(Card))`
  margin-bottom: 8px;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateX(3px);
    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.15);
  }
`;

const FeatureTag = styled(motion.create('span'))`
  display: inline-block;
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 8px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(79, 70, 229, 0.2);
    transform: translateY(-2px);
  }
`;

export default function Consultation() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isVideoConsultationOpen, setIsVideoConsultationOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const theme = useTheme();

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'doctor_added':
          setDoctors(prevDoctors => [...prevDoctors, data.doctor]);
          break;
        case 'doctor_deleted':
          setDoctors(prevDoctors => prevDoctors.filter(doc => doc.id !== data.doctorId));
          if (selectedDoctor?.id === data.doctorId) {
            setIsVideoConsultationOpen(false);
            setSelectedDoctor(null);
          }
          break;
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Connection error. Please refresh the page.');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (wsRef.current?.readyState === WebSocket.CLOSED) {
          wsRef.current = new WebSocket('ws://localhost:5000');
        }
      }, 5000);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/doctors?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError('Failed to fetch doctors. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch of doctors
  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChatbotClose = () => {
    setIsChatbotOpen(false);
  };

  const handleVideoConsultationClose = () => {
    setIsVideoConsultationOpen(false);
    setSelectedDoctor(null);
  };

  const handleStartVideoCall = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsVideoConsultationOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <VideoCallIcon sx={{ fontSize: 40, mr: 2, color: '#4f46e5' }} />
              </motion.div>
              <Typography variant="h3" component="h1" sx={{ 
                background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}>
                Online Consultation
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchDoctors}
              disabled={isLoading}
              startIcon={<RefreshIcon />}
            >
              {isLoading ? 'Refreshing...' : 'Refresh Doctors'}
            </Button>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography variant="h6" color="text.secondary" paragraph>
            Connect with qualified doctors through secure video consultations from the comfort of your home.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box sx={{ my: 4, p: 3, bgcolor: 'rgba(79, 70, 229, 0.05)', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#4f46e5', fontWeight: 600 }}>
              Consultation Features:
            </Typography>
            {[
              "Secure video consultations with qualified doctors",
              "Easy appointment scheduling",
              "Prescription delivery to your doorstep",
              "24/7 emergency support available"
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Typography variant="body1" color="text.secondary" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#4f46e5', marginRight: '8px' }}>•</span>
                  {feature}
                </Typography>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -5 }}
              onClick={() => setIsVideoConsultationOpen(true)}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <VideoCallIcon sx={{ fontSize: 40, color: '#4f46e5', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom sx={{ 
                  color: '#4f46e5',
                  fontWeight: 600
                }}>
                  Video Consultation
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Connect with registered doctors through secure video calls.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {["Secure", "Real-time", "Recorded sessions", "Easy to use"].map((feature, idx) => (
                    <FeatureTag
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 + idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {feature}
                    </FeatureTag>
                  ))}
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ y: -5 }}
              onClick={() => setIsChatbotOpen(true)}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <SmartToyIcon sx={{ fontSize: 40, color: '#4f46e5', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom sx={{ 
                  color: '#4f46e5',
                  fontWeight: 600
                }}>
                  Emergency Support
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Get immediate assistance through our AI-powered emergency chatbot.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {["24/7 Available", "Instant response", "Medical guidance", "Emergency protocols"].map((feature, idx) => (
                    <FeatureTag
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.1 + idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {feature}
                    </FeatureTag>
                  ))}
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#4f46e5', fontWeight: 600 }}>
              Available Doctors
            </Typography>
            <List>
              {doctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                >
                  <DoctorCard>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#4f46e5' }}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              {doctor.name}
                            </Typography>
                            <Chip
                              label={doctor.availability}
                              color={doctor.availability === 'Available' ? 'success' : 'warning'}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="body2" color="text.secondary">
                              Specialization: {doctor.specialization}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                              <PhoneIcon fontSize="small" />
                              <Typography variant="body2" color="text.primary">
                                {doctor.phone}
                              </Typography>
                            </Box>
                            {doctor.experience && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                <Typography variant="body2" color="text.secondary">
                                  Experience: {doctor.experience} {doctor.experience === '1' ? 'year' : 'years'}
                                </Typography>
                              </Box>
                            )}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                              <Typography variant="body2" color="text.secondary">
                                License: {doctor.licenseNumber}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                      <Button
                        variant="contained"
                        startIcon={<VideoCallIcon />}
                        onClick={() => handleStartVideoCall(doctor)}
                        disabled={doctor.availability !== 'Available'}
                        sx={{
                          borderRadius: '20px',
                          textTransform: 'none',
                          fontWeight: 'bold',
                        }}
                      >
                        Start Call
                      </Button>
                    </ListItem>
                  </DoctorCard>
                  <Divider variant="inset" component="li" />
                </motion.div>
              ))}
            </List>
          </Box>
        </motion.div>
      </Box>

      <EmergencyChatbot isOpen={isChatbotOpen} onClose={handleChatbotClose} />
      {doctors && doctors.length > 0 && (
        <VideoConsultationScreen 
          open={isVideoConsultationOpen} 
          onClose={handleVideoConsultationClose}
          doctors={doctors}
          selectedDoctor={selectedDoctor}
        />
      )}
    </Container>
  );
} 