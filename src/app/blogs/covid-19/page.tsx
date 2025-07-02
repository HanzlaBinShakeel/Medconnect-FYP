"use client";
import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import Image from 'next/image';

export default function Covid19Blog() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ position: 'relative', height: 400, mb: 4 }}>
          <Image
            src="https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-4.0.3"
            alt="COVID-19 Prevention"
            fill
            style={{ objectFit: 'cover', borderRadius: '12px' }}
          />
        </Box>

        <Typography variant="h3" component="h1" sx={{ 
          fontWeight: 700, 
          color: '#1e40af',
          mb: 3,
          fontFamily: 'Poppins, sans-serif'
        }}>
          COVID-19: Latest Prevention Guidelines
        </Typography>

        <Typography variant="subtitle1" sx={{ 
          color: '#64748b',
          mb: 4,
          fontFamily: 'Poppins, sans-serif'
        }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              According to the World Health Organization (WHO) and Centers for Disease Control and Prevention (CDC), 
              staying informed about COVID-19 prevention measures is crucial for public health. Here are the latest 
              guidelines and recommendations:
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Vaccination Updates
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              • Stay up to date with COVID-19 vaccines, including booster doses as recommended
              • Vaccination remains the most effective way to prevent severe illness and hospitalization
              • Consult with healthcare providers about vaccine eligibility and scheduling
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Prevention Measures
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              • Wear masks in crowded indoor settings
              • Maintain physical distance when possible
              • Practice good hand hygiene
              • Ensure proper ventilation in indoor spaces
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Latest Variants
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Stay informed about emerging variants and their characteristics. Current variants of concern include:
              • Omicron subvariants
              • Delta variant
              • Other circulating variants
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Symptoms to Watch For
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Common symptoms include:
              • Fever or chills
              • Cough
              • Shortness of breath
              • Fatigue
              • Muscle or body aches
              • Loss of taste or smell
              • Sore throat
              • Congestion or runny nose
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              When to Seek Medical Care
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Seek immediate medical attention if you experience:
              • Difficulty breathing
              • Persistent pain or pressure in the chest
              • New confusion
              • Inability to wake or stay awake
              • Pale, gray, or blue-colored skin, lips, or nail beds
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Quick Resources
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                • WHO COVID-19 Dashboard
                • CDC Guidelines
                • Local Health Department
                • Emergency Hotlines
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 