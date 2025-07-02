"use client";
import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import Image from 'next/image';

export default function PregnancyCareBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ position: 'relative', height: 400, mb: 4 }}>
          <Image
            src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3"
            alt="Pregnancy Care"
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
          Essential Pregnancy Care Guide
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
              Based on Mayo Clinic's expert guidelines, this comprehensive pregnancy care guide provides essential 
              information for expectant mothers to ensure a healthy pregnancy journey.
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Prenatal Nutrition
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Essential nutrients for a healthy pregnancy:
              • Folic acid: 400-800 micrograms daily
              • Iron: 27 milligrams daily
              • Calcium: 1,000 milligrams daily
              • Protein: 75-100 grams daily
              • Omega-3 fatty acids
              • Vitamin D
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Safe Exercise Guidelines
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Recommended activities:
              • Walking
              • Swimming
              • Prenatal yoga
              • Low-impact aerobics
              • Stationary cycling
              
              Activities to avoid:
              • Contact sports
              • Activities with high fall risk
              • Scuba diving
              • Hot yoga
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Important Milestones
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              First Trimester (Weeks 1-12):
              • Initial prenatal visit
              • First ultrasound
              • Genetic screening tests
              
              Second Trimester (Weeks 13-26):
              • Anatomy scan
              • Glucose screening
              • Movement monitoring
              
              Third Trimester (Weeks 27-40):
              • Growth scans
              • Group B strep test
              • Birth plan preparation
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Warning Signs
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Seek immediate medical attention for:
              • Severe abdominal pain
              • Vaginal bleeding
              • Sudden swelling
              • Severe headaches
              • Decreased fetal movement
              • Water breaking
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Quick Resources
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                • Mayo Clinic Pregnancy Guide
                • Local OB/GYN Directory
                • Emergency Contact Numbers
                • Pregnancy Apps
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 