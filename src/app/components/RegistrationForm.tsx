"use client";
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const StyledForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 12px;
    background-color: #f8fafc;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #f1f5f9;
    }

    &.Mui-focused {
      background-color: white;
    }
  }
`;

const StyledButton = styled(Button)`
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
  padding: 12px 24px;
  font-size: 16px;
  background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
  color: white;
  margin-top: 8px;

  &:hover {
    background: linear-gradient(135deg, #4338ca 0%, #312e81 100%);
  }
`;

const BackButton = styled(Button)`
  text-transform: none;
  color: #64748b;
  font-weight: 500;
  margin-top: 16px;

  &:hover {
    color: #4f46e5;
    background: transparent;
  }
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 12px;
`;

const LogoIcon = styled(motion.div)`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 20px;
    color: white;
  }
`;

const LogoText = styled(motion.div)`
  font-size: 22px;
  font-weight: 800;
  background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Poppins', sans-serif;
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`registration-tabpanel-${index}`}
      aria-labelledby={`registration-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function RegistrationForm() {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    specialization: '', // For doctors
    licenseNumber: '', // For doctors
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: tabValue === 0 ? 'patient' : 'doctor'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error) {
          setError(errorData.error);
        } else {
          setError(errorData.message || 'Registration failed');
        }
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 4,
        p: 4,
        borderRadius: 4,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        background: 'white',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <LogoContainer>
          <LogoIcon>
            <HealthAndSafetyIcon />
          </LogoIcon>
          <LogoText>MedConnect</LogoText>
        </LogoContainer>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, color: '#1e293b' }}>
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Join our healthcare community today
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="user type tabs"
          variant="fullWidth"
        >
          <Tab label="Patient" />
          <Tab label="Doctor" />
        </Tabs>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Registration successful! Redirecting to login...
        </Alert>
      )}

      <StyledForm
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        onSubmit={handleSubmit}
      >
        <StyledTextField
          fullWidth
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />

        {tabValue === 1 ? (
          <>
            <StyledTextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />

            <StyledTextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />

            <StyledTextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              multiline
              rows={2}
              placeholder="Enter your complete address"
            />

            <StyledTextField
              fullWidth
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              placeholder="Enter your medical specialization"
            />

            <StyledTextField
              fullWidth
              label="License Number"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
              placeholder="Enter your medical license number"
            />
          </>
        ) : (
          <>
            <StyledTextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />

            <StyledTextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />

            <StyledTextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              multiline
              rows={2}
              placeholder="Enter your complete address"
            />
          </>
        )}

        <StyledTextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter password (minimum 8 characters)"
        />

        <StyledTextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          placeholder="Confirm your password"
        />

        <StyledButton type="submit" variant="contained">
          Create Account
        </StyledButton>

        <BackButton onClick={() => router.push('/login')}>
          Already have an account? Sign in
        </BackButton>
      </StyledForm>
    </Box>
  );
} 