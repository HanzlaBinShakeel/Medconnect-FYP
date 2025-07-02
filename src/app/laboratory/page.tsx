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
import ScienceIcon from '@mui/icons-material/Science';
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

const laboratories = [
  {
    name: "Chughtai Lab",
    description: "One of Pakistan's largest and most trusted laboratory networks offering home sample collection and online reports.",
    link: "https://chughtailab.com",
    contact: " 03111456789",
    features: ["Home sample collection", "Online reports", "Nationwide coverage", "Mobile app available"]
  },
  {
    name: "Excel Labs",
    description: "Premium diagnostic services with advanced testing facilities and quick online report delivery.",
    link: "https://excel-labs.com/",
    contact: "051 8844000",
    features: ["Advanced testing", "Quick reports", "Home collection", "Multiple locations"]
  },
  {
    name: "Shaukat Khanum Memorial Cancer Hospital & Research Centre",
    description: "World-class diagnostic services with specialized cancer screening and testing facilities.",
    link: "https://shaukatkhanum.org.pk",
    contact: "+92 42 3590 5000",
    features: ["Cancer screening", "Specialized tests", "Research facilities", "International standards"]
  },
  {
    name: "Aga Khan University Hospital Laboratory",
    description: "Advanced diagnostic services with international accreditation and comprehensive test menu.",
    link: "https://hospitals.aku.edu/pakistan",
    contact: "+92 21 111 911 911 ",
    features: ["International accreditation", "Comprehensive tests", "Expert staff", "Quality assurance"]
  },
  {
    name: "Islamabad Diagnostic Center (IDC)",
    description: "Modern diagnostic facilities with branches across major cities and online report access.",
    link: "https://idc.net.pk",
    contact: "03111000432",
    features: ["Multiple branches", "Online reports", "Home collection", "Modern equipment"]
  },
  {
    name: "Shifa4U",
    description: "Comprehensive diagnostic services with advanced testing facilities and quick online report delivery.",
    link: "https://shifa4u.com",
    contact: "03227341466",
    features: ["Advanced testing", "Quick reports", "Home collection", "Multiple locations"]
  },
  {
    name: "Mughal Labs",
    description: "Trusted diagnostic laboratory providing comprehensive medical testing services with reliable results.",
    link: "https://mughallabs.com",
    contact: "042111500500",
    features: ["Comprehensive testing", "Reliable results", "Professional staff", "Quality assurance"]
  }
];

export default function Laboratory() {
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
              <ScienceIcon sx={{ fontSize: 40, mr: 2, color: '#4f46e5' }} />
            </motion.div>
            <Typography variant="h3" component="h1" sx={{ 
              background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}>
              Online Laboratories in Pakistan
            </Typography>
          </Box>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography variant="h6" color="text.secondary" paragraph>
            Discover trusted online laboratory services in Pakistan offering convenient sample collection and digital reports.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box sx={{ my: 4, p: 3, bgcolor: 'rgba(79, 70, 229, 0.05)', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#4f46e5', fontWeight: 600 }}>
              Important Notes:
            </Typography>
            {[
              "Always verify the accreditation and certification of laboratories before getting tests done",
              "Check for proper licensing with the Pakistan Medical Commission (PMC)",
              "Ensure the laboratory follows international quality standards",
              "Review the laboratory's privacy policy regarding your test results",
              "Confirm the availability of home sample collection in your area"
            ].map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Typography variant="body1" color="text.secondary" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#4f46e5', marginRight: '8px' }}>•</span>
                  {note}
                </Typography>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          {laboratories.map((lab, index) => (
            <Grid item xs={12} md={6} key={index}>
              <StyledCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ 
                    color: '#4f46e5',
                    fontWeight: 600
                  }}>
                    {lab.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {lab.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    <strong>Contact:</strong> {lab.contact}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {lab.features.map((feature, idx) => (
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
                <CardActions>
                  <Button
                    component={Link}
                    href={lab.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<OpenInNewIcon />}
                    variant="contained"
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