"use client";
import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import Image from 'next/image';

export default function MentalHealthBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ position: 'relative', height: 400, mb: 4 }}>
          <Image
            src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3"
            alt="Mental Health"
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
          Understanding and Managing Mental Health
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
              Based on insights from the National Institute of Mental Health (NIMH), this guide provides 
              comprehensive information about mental health, common conditions, and effective management strategies.
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Common Mental Health Conditions
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              • Anxiety Disorders
              - Generalized Anxiety Disorder
              - Panic Disorder
              - Social Anxiety Disorder
              
              • Mood Disorders
              - Depression
              - Bipolar Disorder
              - Seasonal Affective Disorder
              
              • Other Conditions
              - ADHD
              - PTSD
              - OCD
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Self-Care Strategies
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Daily Practices:
              • Regular exercise
              • Balanced nutrition
              • Adequate sleep
              • Mindfulness meditation
              • Journaling
              • Social connection
              
              Professional Support:
              • Therapy
              • Support groups
              • Medication (when prescribed)
              • Regular check-ups
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Warning Signs
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Seek professional help if you experience:
              • Persistent sadness or anxiety
              • Changes in sleep patterns
              • Loss of interest in activities
              • Difficulty concentrating
              • Changes in appetite
              • Thoughts of self-harm
              • Substance abuse
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Crisis Resources
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Emergency Contacts:
              • National Suicide Prevention Lifeline: 988
              • Crisis Text Line: Text HOME to 741741
              • Emergency Services: 911
              • Local Mental Health Crisis Center
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Additional Resources
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                • NIMH Information Center
                • Mental Health Apps
                • Online Support Communities
                • Local Mental Health Services
                • Crisis Intervention Resources
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 