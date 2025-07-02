"use client";
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    maxWidth: '800px',
    width: '100%',
    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px',
    background: 'rgba(255, 255, 255, 0.9)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 1)',
    },
  },
}));

const DoctorCard = styled(ListItem)(({ theme }) => ({
  borderRadius: '12px',
  marginBottom: '8px',
  background: 'white',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateX(3px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

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

interface VideoConsultationScreenProps {
  open: boolean;
  onClose: () => void;
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
}

export default function VideoConsultationScreen({ open, onClose, doctors, selectedDoctor }: VideoConsultationScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(selectedDoctor);

  useEffect(() => {
    setCurrentDoctor(selectedDoctor);
  }, [selectedDoctor]);

  const filteredDoctors = doctors.filter(doctor =>
    (typeof doctor.name === 'string' && doctor.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof doctor.specialization === 'string' && doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleStartCall = (doctor: Doctor) => {
    setCurrentDoctor(doctor);
    // Here you would typically integrate with your video calling API
    console.log('Starting video call with:', doctor.name);
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'linear-gradient(45deg, #1976d2, #2196f3)',
        color: 'white',
        padding: '16px 24px',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VideoCallIcon />
          <Typography variant="h6">
            {currentDoctor ? `Video Call with Dr. ${currentDoctor.name}` : 'Video Consultation'}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {currentDoctor ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Avatar 
              sx={{ 
                width: 100, 
                height: 100, 
                margin: '0 auto 16px',
                bgcolor: '#1976d2'
              }}
            >
              <PersonIcon sx={{ fontSize: 50 }} />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              Dr. {currentDoctor.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {currentDoctor.specialization}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<VideoCallIcon />}
                onClick={() => handleStartCall(currentDoctor)}
                sx={{ 
                  borderRadius: '25px',
                  padding: '10px 30px',
                  fontSize: '1.1rem'
                }}
              >
                Start Video Call
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <SearchField
              fullWidth
              variant="outlined"
              placeholder="Search doctors by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <List>
              {filteredDoctors.map((doctor) => (
                <React.Fragment key={doctor.id}>
                  <DoctorCard>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#1976d2' }}>
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
                              {doctor.specialization}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                              <PhoneIcon fontSize="small" />
                              <Typography variant="body2" color="text.primary">
                                {doctor.phone}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                              <Typography variant="body2" color="text.secondary">
                                Experience: {doctor.experience} years
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                      <Button
                        variant="contained"
                        startIcon={<VideoCallIcon />}
                        onClick={() => handleStartCall(doctor)}
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
                </React.Fragment>
              ))}
            </List>
          </>
        )}
      </DialogContent>
    </StyledDialog>
  );
} 