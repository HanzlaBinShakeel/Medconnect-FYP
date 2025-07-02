"use client";
import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import Image from 'next/image';

export default function NutritionBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ position: 'relative', height: 400, mb: 4 }}>
          <Image
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3"
            alt="Healthy Nutrition"
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
          Essential Guide to Healthy Nutrition
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
              Based on guidelines from the Academy of Nutrition and Dietetics, this comprehensive guide 
              provides essential information about maintaining a balanced and nutritious diet for optimal health.
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Core Nutritional Principles
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Essential Nutrients:
              • Proteins: Lean meats, fish, legumes, dairy
              • Carbohydrates: Whole grains, fruits, vegetables
              • Healthy Fats: Avocados, nuts, olive oil
              • Vitamins & Minerals: Colorful fruits and vegetables
              • Fiber: Whole grains, legumes, vegetables
              • Water: 8-10 glasses daily
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Meal Planning Guidelines
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Daily Recommendations:
              • 5-6 servings of vegetables
              • 2-3 servings of fruits
              • 6-8 servings of whole grains
              • 2-3 servings of lean protein
              • 2-3 servings of dairy or alternatives
              • Limited processed foods and added sugars
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Special Dietary Considerations
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Dietary Restrictions:
              • Vegetarian/Vegan options
              • Gluten-free alternatives
              • Dairy-free alternatives
              • Low-sodium options
              • Diabetic-friendly choices
            </Typography>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Healthy Eating Tips
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Practical Advice:
              • Plan meals ahead
              • Read nutrition labels
              • Practice portion control
              • Stay hydrated
              • Limit processed foods
              • Cook at home when possible
              • Include variety in your diet
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Additional Resources
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                • Nutrition Calculator
                • Meal Planning Tools
                • Recipe Collections
                • Dietary Guidelines
                • Nutrition Apps
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 