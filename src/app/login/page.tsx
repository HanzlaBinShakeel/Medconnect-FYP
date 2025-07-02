"use client";
import React from "react";
import { Typography, Container, Box } from "@mui/material";

export default function Login() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Login
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Sign in to your account
        </Typography>
      </Box>
    </Container>
  );
} 