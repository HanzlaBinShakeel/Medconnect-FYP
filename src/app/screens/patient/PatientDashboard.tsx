"use client";
import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const FeatureCard = styled(motion.create(Card))`
  text-align: center;
  padding: 20px;
  box-shadow: none;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const PatientDashboard: React.FC = () => {
  return (
    <Container sx={{ py: 4, backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h5" gutterBottom>Patient Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FeatureCard>
            <CardContent>
              <Typography variant="h6">Medical History</Typography>
              <Typography variant="body2">View your past consultations and health records.</Typography>
            </CardContent>
          </FeatureCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FeatureCard>
            <CardContent>
              <Typography variant="h6">Schedule Appointment</Typography>
              <Typography variant="body2">Book an appointment with a doctor.</Typography>
            </CardContent>
          </FeatureCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientDashboard; 