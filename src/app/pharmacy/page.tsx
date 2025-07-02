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
import LocalPharmacyRoundedIcon from '@mui/icons-material/LocalPharmacyRounded';
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

const pharmacies = [
  {
    name: "Health Wire Pharmacy",
    description: "A trusted online pharmacy offering a wide range of medicines and healthcare products with reliable delivery service.",
    link: "https://healthwire.pk/pharmacy",
    features: ["Wide range of medicines", "Reliable delivery", "Healthcare products", "Online consultation"]
  },
  {
    name: "Davago Pharmacy",
    description: "A leading online pharmacy providing authentic medicines and healthcare products with nationwide delivery service.",
    link: "https://www.dvago.pk/?srsltid=AfmBOooezKu6GxqwOzLBD_kAsmGfpUQ2_tPPfPDFwHg60xlb4sKQASDN",
    features: ["Nationwide delivery", "Authentic medicines", "Healthcare products", "Online consultation"]
  },
  {
    name: "Sehat.com.pk",
    description: "One of Pakistan's largest online pharmacies offering home delivery across major cities. Accepts both cash on delivery and online payments.",
    link: "https://sehat.com.pk",
    features: ["Home delivery", "Cash on delivery", "Online payments", "Major cities coverage"]
  },
  {
    name: "Dawaai.pk",
    description: "Well-established online pharmacy providing authentic medicines with nationwide home delivery service.",
    link: "https://dawaai.pk",
    features: ["Nationwide delivery", "Authentic medicines", "Prescription service"]
  },
  {
    name: "Medicines.pk",
    description: "Specializes in both prescription and OTC medicines with competitive pricing and reliable service.",
    link: "https://medicines.pk",
    features: ["Prescription & OTC medicines", "Competitive pricing", "Reliable service"]
  },
  {
    name: "PharmacyOnline.pk",
    description: "Provides online consultation with pharmacists and home delivery service for your convenience.",
    link: "https://onlinepharmacy.pk/",
    features: ["Online consultation", "Home delivery", "Pharmacist support"]
  },
  {
    name: "MediMart.pk",
    description: "Focuses on healthcare products and medicines with cash on delivery option available.",
    link: "https://medimart.pk",
    features: ["Healthcare products", "Cash on delivery", "Wide range of medicines"]
  },
  {
    name: "MediCare.pk",
    description: "Provides both medicines and medical equipment with home delivery in major cities.",
    link: "https://medicare.pk",
    features: ["Medicines & equipment", "Major cities delivery", "Healthcare solutions"]
  }
];

export default function Pharmacy() {
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
              <LocalPharmacyRoundedIcon sx={{ fontSize: 40, mr: 2, color: '#4f46e5' }} />
            </motion.div>
            <Typography variant="h3" component="h1" sx={{ 
              background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}>
              Online Pharmacies in Pakistan
            </Typography>
          </Box>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography variant="h6" color="text.secondary" paragraph>
            Discover trusted online pharmacies in Pakistan offering convenient home delivery of medicines and healthcare products.
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
              "Always verify the authenticity of online pharmacies before making purchases",
              "Check for proper licensing and registration with the Drug Regulatory Authority of Pakistan (DRAP)",
              "Be cautious of extremely low prices as they might indicate counterfeit products",
              "Always consult with your doctor before purchasing prescription medications online"
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
          {pharmacies.map((pharmacy, index) => (
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
                    {pharmacy.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {pharmacy.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {pharmacy.features.map((feature, idx) => (
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
                    href={pharmacy.link}
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