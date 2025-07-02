"use client";
import React from "react";
import { Typography, Container, Box } from "@mui/material";

export default function Community() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Community
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Connect with healthcare professionals
        </Typography>
      </Box>
    </Container>
  );
} 