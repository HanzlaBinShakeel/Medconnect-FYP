"use client";
import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  useTheme,
  Divider
} from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Telemedicine() {
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleVideoConsultation = () => {
    router.push('/consultation');
  };

  const handlePharmacy = () => {
    router.push('/pharmacy');
  };

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
              <VideoCallIcon sx={{ fontSize: 40, mr: 2, color: '#4f46e5' }} />
            </motion.div>
            <Typography variant="h3" component="h1" sx={{ 
              background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}>
              Telemedicine & E-Pharmacy
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography variant="h6" color="text.secondary" paragraph>
            Access healthcare services from the comfort of your home through video consultations and online pharmacy services.
          </Typography>
        </motion.div>

        <Box sx={{ width: '100%', mt: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              centered
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                },
                '& .Mui-selected': {
                  color: '#4f46e5 !important',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#4f46e5',
                },
              }}
            >
              <Tab label="Video Consultation" />
              <Tab label="E-Pharmacy" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <StyledCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <VideoCallIcon sx={{ fontSize: 30, mr: 2, color: '#4f46e5' }} />
                      <Typography variant="h5" component="h2">
                        Video Consultation
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Connect with qualified doctors through secure video consultations. Get medical advice, prescriptions, and follow-up care from the comfort of your home.
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleVideoConsultation}
                      sx={{
                        backgroundColor: '#4f46e5',
                        '&:hover': {
                          backgroundColor: '#3730a3',
                        },
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Start Video Consultation
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <StyledCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocalPharmacyRoundedIcon sx={{ fontSize: 30, mr: 2, color: '#4f46e5' }} />
                      <Typography variant="h5" component="h2">
                        E-Pharmacy
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Order your prescribed medications online and get them delivered to your doorstep. Browse through a wide range of healthcare products and medicines.
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handlePharmacy}
                      sx={{
                        backgroundColor: '#4f46e5',
                        '&:hover': {
                          backgroundColor: '#3730a3',
                        },
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Visit E-Pharmacy
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </Box>
    </Container>
  );
} 