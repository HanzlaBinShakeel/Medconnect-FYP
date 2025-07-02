"use client";
import React from "react";
import { 
  Typography, 
  Container, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  Link,
  Divider,
  useTheme
} from "@mui/material";
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion } from "framer-motion";
import styled from "@emotion/styled";

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
    background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(220, 38, 38, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
`;

const FeatureTag = styled(motion.create('span'))`
  display: inline-block;
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 8px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(220, 38, 38, 0.2);
    transform: translateY(-2px);
  }
`;

const ambulances = [
  {
    name: "Rescue 1122",
    description: "Government emergency service providing ambulance and rescue services across Punjab province.",
    contact: "1122",
    website: "https://www.rescue.gov.pk/",
    features: ["Government Service", "Punjab Coverage", "Emergency Response", "Rescue Services"]
  },
  {
    name: "Edhi Ambulance Service",
    description: "Pakistan's largest and most trusted ambulance service with nationwide coverage and 24/7 emergency response.",
    contact: "115",
    website: "https://edhi.org",
    features: ["24/7 Service", "Nationwide Coverage", "Free Service", "Emergency Response"]
  },
  {
    name: "Pakistan Ambulance Service",
    description: "National ambulance service providing emergency medical transportation and first aid services across Pakistan.",
    contact: "03478700001",
    website: "https://pakambulanceservice.com/",
    features: ["National Coverage", "24/7 Service", "Emergency Response", "First Aid","Easy to Contact"]
  },
  {
    name: "Chhipa Ambulance Service",
    description: "Reliable ambulance service providing quick emergency response and patient transportation across major cities.",
    contact: "1020",
    website: "https://chhipa.org",
    features: ["Quick Response", "Major Cities Coverage", "Emergency Care", "Patient Transport"]
  },
  {
    name: "Aman Foundation Ambulance",
    description: "Professional ambulance service with trained paramedics and modern medical equipment for emergency care.",
    contact: "021111111823",
    website: "https://amanhealthcareservices.wordpress.com/aman-ambulance/",
    features: ["Trained Paramedics", "Modern Equipment", "Emergency Care", "Professional Service"]
  },
  {
    name: "JDC Foundation Ambulance",
    description: "Non-profit ambulance service providing free emergency medical transportation and first aid services.",
    contact: "1024",
    website: "https://jdcwelfare.org/campaigns/ambulance-services/",
    features: ["Free Service", "First Aid", "Emergency Transport", "24/7 Availability"]
  },
  {
    name: "Al-Khidmat Ambulance",
    description: "Reliable ambulance service with trained staff and emergency medical equipment for patient care.",
    contact: "1023",
    website: "https://alkhidmat.org",
    features: ["Trained Staff", "Emergency Equipment", "Patient Care", "Quick Response"]
  }
];

export default function Ambulance() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <LocalHospitalRoundedIcon sx={{ fontSize: 40, mr: 2, color: '#dc2626' }} />
            </motion.div>
            <Typography variant="h3" component="h1" sx={{ 
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}>
              Emergency Ambulance Services
            </Typography>
          </Box>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography variant="h6" color="text.secondary" paragraph>
            Access emergency ambulance services across Pakistan for immediate medical assistance and patient transportation.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box sx={{ my: 4, p: 3, bgcolor: 'rgba(220, 38, 38, 0.05)', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#dc2626', fontWeight: 600 }}>
              Important Notes:
            </Typography>
            {[
              "Call emergency services immediately in case of life-threatening situations",
              "Provide clear location details and patient condition when calling for an ambulance",
              "Keep emergency numbers saved in your phone for quick access",
              "Follow the instructions given by emergency operators while waiting for help"
            ].map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Typography variant="body1" color="text.secondary" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#dc2626', marginRight: '8px' }}>•</span>
                  {note}
                </Typography>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          {ambulances.map((ambulance, index) => (
            <Grid item xs={12} md={6} key={index}>
              <StyledCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ 
                    color: '#dc2626',
                    fontWeight: 600
                  }}>
                    {ambulance.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {ambulance.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {ambulance.features.map((feature, idx) => (
                      <FeatureTag
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 + idx * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {feature}
                      </FeatureTag>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    component={Link}
                    href={`tel:${ambulance.contact}`}
                    startIcon={<OpenInNewIcon />}
                    variant="contained"
                    sx={{ 
                      backgroundColor: '#dc2626',
                      '&:hover': {
                        backgroundColor: '#b91c1c',
                      },
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 600,
                      width: '100%'
                    }}
                  >
                    Call Emergency: {ambulance.contact}
                  </Button>
                  <Button
                    component={Link}
                    href={ambulance.website}
                    target="_blank"
                    startIcon={<OpenInNewIcon />}
                    variant="outlined"
                    sx={{ 
                      borderColor: '#dc2626',
                      color: '#dc2626',
                      '&:hover': {
                        borderColor: '#b91c1c',
                        color: '#b91c1c',
                      },
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 600,
                      width: '100%'
                    }}
                  >
                    Visit Website
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
} 