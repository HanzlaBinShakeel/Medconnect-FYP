"use client";
import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import Image from 'next/image';

export default function SleepHealthBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ position: 'relative', height: 400, mb: 4 }}>
          <Image
            src="https://images.unsplash.com/photo-1511295742362-92c96b1cf484?ixlib=rb-4.0.3"
            alt="Sleep Health"
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
          Understanding and Improving Sleep Health
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
              Based on research from the National Sleep Foundation, this comprehensive guide provides 
              essential information about sleep health, common sleep disorders, and effective strategies 
              for better sleep.
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Sleep Requirements
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Age-Based Recommendations:
              • Adults (18-64): 7-9 hours
              • Older Adults (65+): 7-8 hours
              • Teenagers: 8-10 hours
              • Children: 9-11 hours
              • Preschoolers: 10-13 hours
              • Infants: 12-15 hours
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Sleep Hygiene Tips
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Best Practices:
              • Maintain consistent sleep schedule
              • Create a relaxing bedtime routine
              • Optimize bedroom environment
              • Limit screen time before bed
              • Avoid caffeine and alcohol
              • Exercise regularly
              • Manage stress levels
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Common Sleep Disorders
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Types and Symptoms:
              • Insomnia: Difficulty falling/staying asleep
              • Sleep Apnea: Breathing interruptions
              • Restless Leg Syndrome: Uncomfortable sensations
              • Narcolepsy: Excessive daytime sleepiness
              • Sleepwalking: Complex behaviors during sleep
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              When to Seek Help
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Warning Signs:
              • Persistent sleep problems
              • Excessive daytime sleepiness
              • Loud snoring with pauses
              • Difficulty concentrating
              • Mood changes
              • Morning headaches
              • Memory problems
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Additional Resources
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                • Sleep Tracking Apps
                • Sleep Studies
                • Sleep Specialists
                • Sleep Aids
                • Relaxation Techniques
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 