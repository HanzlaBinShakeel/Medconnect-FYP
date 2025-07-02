"use client";
import React from "react";
import { Typography, Container, Box } from "@mui/material";

export default function PatientDashboard() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Patient Dashboard
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Welcome to your healthcare portal
        </Typography>
      </Box>
    </Container>
  );
} 