"use client";
import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import Image from 'next/image';

export default function FitnessBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ position: 'relative', height: 400, mb: 4 }}>
          <Image
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3"
            alt="Fitness and Exercise"
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
          Complete Guide to Fitness and Exercise
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
              Based on guidelines from the American College of Sports Medicine, this comprehensive guide 
              provides essential information about maintaining a healthy and active lifestyle through proper exercise.
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Types of Exercise
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Essential Components:
              • Cardio: Running, cycling, swimming
              • Strength Training: Weight lifting, resistance bands
              • Flexibility: Yoga, stretching
              • Balance: Tai chi, stability exercises
              • HIIT: High-intensity interval training
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Weekly Exercise Guidelines
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Recommended Schedule:
              • 150 minutes moderate cardio weekly
              • 2-3 strength training sessions
              • 2-3 flexibility sessions
              • Daily movement (10,000 steps)
              • Rest days for recovery
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Exercise Safety
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Important Guidelines:
              • Warm up properly
              • Stay hydrated
              • Use correct form
              • Progress gradually
              • Listen to your body
              • Wear appropriate gear
              • Cool down after exercise
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Common Mistakes to Avoid
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Exercise Pitfalls:
              • Skipping warm-ups
              • Poor form
              • Overtraining
              • Not staying hydrated
              • Ignoring pain signals
              • Inconsistent routine
              • Not getting enough rest
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Additional Resources
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                • Workout Plans
                • Exercise Videos
                • Fitness Trackers
                • Nutrition Guides
                • Recovery Tips
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 