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

const DoctorDashboard: React.FC = () => {
  return (
    <Container sx={{ py: 4, backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h5" gutterBottom>Doctor Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FeatureCard>
            <CardContent>
              <Typography variant="h6">Manage Appointments</Typography>
              <Typography variant="body2">View and manage your appointments.</Typography>
            </CardContent>
          </FeatureCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FeatureCard>
            <CardContent>
              <Typography variant="h6">Patient Records</Typography>
              <Typography variant="body2">Access patient medical records and history.</Typography>
            </CardContent>
          </FeatureCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DoctorDashboard; 