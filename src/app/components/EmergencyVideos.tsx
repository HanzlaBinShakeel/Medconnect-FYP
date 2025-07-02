"use client";
import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import Image from 'next/image';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function EmergencyVideos() {
  return (
    <Box sx={{ py: 8, bgcolor: '#f8fafc' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h2" sx={{ 
            fontWeight: 700, 
            color: '#1e40af',
            mb: 2,
            fontFamily: 'Poppins, sans-serif'
          }}>
            Emergency Treatment Videos
          </Typography>
          <Typography variant="subtitle1" sx={{ 
            color: '#64748b',
            maxWidth: '600px',
            mx: 'auto',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Quick access to essential emergency care videos and first aid instructions
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Video Card 1 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 3
              }
            }}>
              <Box sx={{ position: 'relative', height: 200 }}>
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3"
                  alt="CPR Training"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                  CPR Training
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Learn essential CPR techniques for adults, children, and infants. This video covers proper hand placement, compression rate, and rescue breaths.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  href="https://www.youtube.com/watch?v=J7uDVLbr5hI"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3
                    }
                  }}
                >
                  Watch Video
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Video Card 2 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 3
              }
            }}>
              <Box sx={{ position: 'relative', height: 200 }}>
                <Image
                  src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3"
                  alt="First Aid Basics"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                  First Aid Basics
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Essential first aid techniques for common emergencies including burns, cuts, and fractures. Learn how to assess and respond to various injuries.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  href="https://www.youtube.com/watch?v=J7uDVLbr5hI"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3
                    }
                  }}
                >
                  Watch Video
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Video Card 3 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 3
              }
            }}>
              <Box sx={{ position: 'relative', height: 200 }}>
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3"
                  alt="Emergency Response"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                  Emergency Response
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Learn how to respond to medical emergencies including heart attacks, strokes, and severe allergic reactions. Quick action can save lives.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  href="https://www.youtube.com/watch?v=J7uDVLbr5hI"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3
                    }
                  }}
                >
                  Watch Video
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 