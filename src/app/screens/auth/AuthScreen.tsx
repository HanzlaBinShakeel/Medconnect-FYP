"use client";
import React from "react";
import { Box, Modal, Paper, Tab, Tabs, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PasswordRecoveryScreen from './PasswordRecoveryScreen';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 380px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const ModalHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 16px;
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

const StyledTabs = styled(Tabs)`
  margin-bottom: 16px;
  
  .MuiTab-root {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    text-transform: none;
    font-size: 13px;
    color: #64748b;
    min-height: 32px;
    padding: 0 12px;
    
    &.Mui-selected {
      color: #4f46e5;
    }
  }
  
  .MuiTabs-indicator {
    background: linear-gradient(90deg, #4f46e5, #6366f1);
    height: 2px;
  }
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 12px;
  
  .MuiOutlinedInput-root {
    border-radius: 6px;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #4f46e5;
    }
    
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #4f46e5;
    }
  }
  
  .MuiInputLabel-root {
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    
    &.Mui-focused {
      color: #4f46e5;
    }
  }

  .MuiFormHelperText-root {
    font-size: 11px;
    margin-top: 2px;
  }
`;

const StyledSelect = styled(FormControl)`
  margin-bottom: 20px;
  
  .MuiOutlinedInput-root {
    border-radius: 12px;
    font-family: 'Poppins', sans-serif;
  }
  
  .MuiInputLabel-root {
    font-family: 'Poppins', sans-serif;
    
    &.Mui-focused {
      color: #4f46e5;
    }
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
  font-size: 16px;
  background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
  margin-top: 12px;
  
  &:hover {
    background: linear-gradient(135deg, #4338ca 0%, #312e81 100%);
  }
`;

const BackButton = styled(Button)`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
  font-size: 16px;
  margin-top: 12px;
  background: #f1f5f9;
  color: #64748b;
  
  &:hover {
    background: #e2e8f0;
  }
`;

const AuthScreen: React.FC<{
  open: boolean;
  onClose: () => void;
  isLogin: boolean;
}> = ({ open, onClose, isLogin }) => {
  const [tabValue, setTabValue] = React.useState(0);
  const [formData, setFormData] = React.useState({
    identifier: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    specialization: '',
    pmcLicense: '',
    experience: '',
    userType: 'patient'
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({
    identifier: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    specialization: '',
    pmcLicense: '',
    experience: ''
  });
  const [showSpecializationDialog, setShowSpecializationDialog] = React.useState(false);
  const [customSpecialization, setCustomSpecialization] = React.useState('');
  const [showCustomInput, setShowCustomInput] = React.useState(false);
  const [showPasswordRecovery, setShowPasswordRecovery] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const router = useRouter();

  const specializations = [
    'MBBS',
    'Cardiology',
    'Dermatology',
    'Endocrinology',
    'Gastroenterology',
    'General Medicine',
    'Neurology',
    'Oncology',
    'Ophthalmology',
    'Pediatrics',
    'Psychiatry',
    'Surgery',
    'Urology',
    'Pharmacist',
    'Veterinary Medicine',
    'Veterinary Surgery',
    'Veterinary Internal Medicine',
    'Veterinary Emergency Care'
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setFormData(prev => ({
      ...prev,
      userType: newValue === 0 ? 'patient' : 'doctor',
      identifier: '',
      password: ''
    }));
    setErrors(prev => ({
      ...prev,
      identifier: '',
      password: ''
    }));
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateIdentifier = (value: string): { isValid: boolean; type: string } => {
    // Check if it's an email
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { isValid: true, type: 'email' };
    }
    
    // Check if it's a phone number
    if (/^\+?[\d\s-]{10,}$/.test(value)) {
      return { isValid: true, type: 'phoneNumber' };
    }
    
    // Check if it's a username (at least 3 characters)
    if (value.length >= 3) {
      return { isValid: true, type: 'username' };
    }
    
    return { isValid: false, type: '' };
  };

  const validatePatientRegistration = () => {
    const newErrors: Record<string, string> = {};
    let hasError = false;

    // Validate full name (username)
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
      hasError = true;
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters long';
      hasError = true;
    } else if (formData.fullName.length > 40) {
      newErrors.fullName = 'Full name cannot exceed 40 characters';
      hasError = true;
    }

    // Validate phone number
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
      hasError = true;
    } else if (!/^\+?[\d\s-]{11,14}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be between 11 and 14 digits';
      hasError = true;
    }

    // Validate email (optional for patients)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }

    // Validate address
    if (!formData.address) {
      newErrors.address = 'Address is required';
      hasError = true;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      hasError = true;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      hasError = true;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      hasError = true;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSpecializationSelect = (specialization: string) => {
    if (specialization === 'Other') {
      setShowCustomInput(true);
      return;
    }
    setFormData(prev => ({
      ...prev,
      specialization
    }));
    setShowSpecializationDialog(false);
    setShowCustomInput(false);
    setCustomSpecialization('');
  };

  const handleCustomSpecializationSubmit = () => {
    if (customSpecialization.trim()) {
      setFormData(prev => ({
        ...prev,
        specialization: customSpecialization.trim()
      }));
      setShowSpecializationDialog(false);
      setShowCustomInput(false);
      setCustomSpecialization('');
    }
  };

  const validateDoctorRegistration = () => {
    const newErrors: Record<string, string> = {};
    let hasError = false;

    // Validate full name (username)
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
      hasError = true;
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters long';
      hasError = true;
    } else if (formData.fullName.length > 40) {
      newErrors.fullName = 'Full name cannot exceed 40 characters';
      hasError = true;
    }

    // Validate email (mandatory for doctors)
    if (!formData.email) {
      newErrors.email = 'Email is required for doctor registration';
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }

    // Validate phone number
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
      hasError = true;
    } else if (!/^\+?[\d\s-]{11,14}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be between 11 and 14 digits';
      hasError = true;
    }

    // Validate address
    if (!formData.address) {
      newErrors.address = 'Address is required';
      hasError = true;
    }

    // Validate specialization
    if (!formData.specialization) {
      newErrors.specialization = 'Please select your specialization';
      hasError = true;
    }

    // Validate PMC license
    if (!formData.pmcLicense) {
      newErrors.pmcLicense = 'PMC license number is required';
      hasError = true;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      hasError = true;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      hasError = true;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      hasError = true;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    
    // Reset errors
    setErrors({
      identifier: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      specialization: '',
      pmcLicense: '',
      experience: ''
    });

    if (!isLogin) {
      // Validate based on user type
      if (formData.userType === 'doctor') {
        if (!validateDoctorRegistration()) {
          console.log('Doctor validation failed');
          return;
        }
      } else {
        if (!validatePatientRegistration()) {
          console.log('Patient validation failed');
          return;
        }
      }
    } else {
      // Login validation
      if (!formData.identifier) {
        setErrors(prev => ({
          ...prev,
          identifier: 'Please enter your email, phone number, or username'
        }));
        return;
      }

      const { isValid, type } = validateIdentifier(formData.identifier);
      if (!isValid) {
        setErrors(prev => ({
          ...prev,
          identifier: 'Please enter a valid email, phone number, or username'
        }));
        return;
      }

      if (!formData.password) {
        setErrors(prev => ({
          ...prev,
          password: 'Password is required'
        }));
        return;
      }
    }

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      
      // Format the registration data to match backend expectations
      const registrationData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phoneNumber,
        address: formData.address,
        role: formData.userType,
        ...(formData.userType === 'doctor' && {
          specialization: formData.specialization,
          licenseNumber: formData.pmcLicense,
          yearsOfExperience: formData.experience ? parseInt(formData.experience) : undefined
        })
      };

      console.log('Sending registration data:', registrationData);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isLogin ? formData : registrationData),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('token', responseData.token);
          localStorage.setItem('user', JSON.stringify(responseData.user));
          onClose();
          router.push(responseData.user.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
        } else {
          // For registration, show success message and redirect to login
          setShowSuccess(true);
          setTimeout(() => {
            onClose();
            router.push('/login');
          }, 2000);
        }
      } else {
        console.error('Registration failed:', responseData);
        // Handle specific error messages from backend
        if (responseData.error) {
          if (responseData.error.includes('email')) {
            setErrors(prev => ({
              ...prev,
              email: responseData.error,
              identifier: '' // Clear any previous identifier error
            }));
            // Show error alert
            setShowSuccess(false);
          } else if (responseData.error.includes('required')) {
            setErrors(prev => ({
              ...prev,
              identifier: responseData.error,
              email: '' // Clear any previous email error
            }));
          } else {
            setErrors(prev => ({
              ...prev,
              identifier: responseData.error,
              email: '' // Clear any previous email error
            }));
          }
        } else {
          setErrors(prev => ({
            ...prev,
            identifier: responseData.message || (isLogin ? 'Login failed' : 'Registration failed'),
            email: '' // Clear any previous email error
          }));
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrors(prev => ({
        ...prev,
        identifier: 'An unexpected error occurred. Please try again.'
      }));
    }
  };

  return (
    <>
      <StyledModal
        open={open}
        onClose={onClose}
        aria-labelledby="auth-modal"
        aria-describedby="auth-form"
      >
        <ModalContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <ModalHeader>
            <LogoContainer>
              <LogoIcon>
                <HealthAndSafetyIcon />
              </LogoIcon>
              <LogoText>MedConnect</LogoText>
            </LogoContainer>
            <Typography variant="h5" component="h2" gutterBottom>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isLogin
                ? 'Sign in to your account to continue'
                : 'Join our healthcare community today'}
            </Typography>
          </ModalHeader>

          {showSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Registration successful! Redirecting to login...
            </Alert>
          )}

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
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

          <form onSubmit={handleSubmit}>
            {isLogin ? (
              <>
                <StyledTextField
                  fullWidth
                  label={formData.userType === 'doctor' ? "Email" : "Email / Phone Number / Username"}
                  value={formData.identifier}
                  onChange={handleInputChange('identifier')}
                  error={!!errors.identifier}
                  helperText={errors.identifier}
                  placeholder={formData.userType === 'doctor' 
                    ? "Enter your email address"
                    : "Enter your email, phone number, or username"}
                  required
                />

                <StyledTextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Button
                    onClick={() => setShowPasswordRecovery(true)}
                    sx={{
                      textTransform: 'none',
                      color: '#4f46e5',
                      '&:hover': {
                        background: 'transparent',
                        color: '#3730a3',
                      },
                    }}
                  >
                    Forgot Password?
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <StyledTextField
                  fullWidth
                  label="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange('fullName')}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  placeholder="Enter your full name (3-40 characters)"
                  required
                />

                {formData.userType === 'doctor' ? (
                  <>
                    <StyledTextField
                      fullWidth
                      label="Email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      error={!!errors.email}
                      helperText={errors.email}
                      placeholder="Enter your email address"
                      required
                    />

                    <StyledTextField
                      fullWidth
                      label="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange('phoneNumber')}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber}
                      placeholder="Enter your phone number (11-14 digits)"
                      required
                    />

                    <StyledTextField
                      fullWidth
                      label="Address"
                      value={formData.address}
                      onChange={handleInputChange('address')}
                      error={!!errors.address}
                      helperText={errors.address}
                      placeholder="Enter your complete address"
                      required
                      multiline
                      rows={2}
                    />

                    <StyledTextField
                      fullWidth
                      label="Specialization"
                      value={formData.specialization}
                      onClick={() => setShowSpecializationDialog(true)}
                      error={!!errors.specialization}
                      helperText={errors.specialization}
                      placeholder="Select your specialization"
                      required
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <StyledTextField
                      fullWidth
                      label="PMC License Number"
                      value={formData.pmcLicense}
                      onChange={handleInputChange('pmcLicense')}
                      error={!!errors.pmcLicense}
                      helperText={errors.pmcLicense}
                      placeholder="Enter your PMC license number"
                      required
                    />

                    <StyledTextField
                      fullWidth
                      label="Experience (Optional)"
                      value={formData.experience}
                      onChange={handleInputChange('experience')}
                      error={!!errors.experience}
                      helperText={errors.experience}
                      placeholder="Enter years of experience"
                    />
                  </>
                ) : (
                  <>
                    <StyledTextField
                      fullWidth
                      label="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange('phoneNumber')}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber}
                      placeholder="Enter your phone number (11-14 digits)"
                      required
                    />

                    <StyledTextField
                      fullWidth
                      label="Email (Optional)"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      error={!!errors.email}
                      helperText={errors.email}
                      placeholder="Enter your email address"
                    />

                    <StyledTextField
                      fullWidth
                      label="Address"
                      value={formData.address}
                      onChange={handleInputChange('address')}
                      error={!!errors.address}
                      helperText={errors.address}
                      placeholder="Enter your complete address"
                      required
                      multiline
                      rows={2}
                    />
                  </>
                )}

                <StyledTextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  placeholder="Enter password (minimum 8 characters)"
                  required
                />

                <StyledTextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  placeholder="Confirm your password"
                  required
                />
              </>
            )}

            <StyledButton type="submit" variant="contained" color="primary">
              {isLogin ? 'Sign In' : 'Create Account'}
            </StyledButton>

            <BackButton onClick={onClose}>
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </BackButton>
          </form>
        </ModalContent>
      </StyledModal>

      {/* Specialization Selection Dialog */}
      <Modal
        open={showSpecializationDialog}
        onClose={() => {
          setShowSpecializationDialog(false);
          setShowCustomInput(false);
          setCustomSpecialization('');
        }}
        aria-labelledby="specialization-dialog-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          maxHeight: '80vh',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontSize: '1.1rem', mb: 2 }}>
            Select Specialization
          </Typography>
          {showCustomInput ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <StyledTextField
                fullWidth
                label="Enter Your Specialization"
                value={customSpecialization}
                onChange={(e) => setCustomSpecialization(e.target.value)}
                placeholder="Type your specialization"
                autoFocus
                size="small"
              />
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomSpecialization('');
                  }}
                  size="small"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCustomSpecializationSubmit}
                  disabled={!customSpecialization.trim()}
                  size="small"
                >
                  Add Specialization
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'grid', gap: 0.75 }}>
              {specializations.map((spec) => (
                <Button
                  key={spec}
                  variant={formData.specialization === spec ? 'contained' : 'outlined'}
                  onClick={() => handleSpecializationSelect(spec)}
                  size="small"
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    borderRadius: 1,
                    p: 1
                  }}
                >
                  {spec}
                </Button>
              ))}
              <Button
                variant="outlined"
                onClick={() => handleSpecializationSelect('Other')}
                size="small"
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  borderRadius: 1,
                  p: 1,
                  borderColor: '#4f46e5',
                  color: '#4f46e5',
                  '&:hover': {
                    borderColor: '#3730a3',
                    backgroundColor: 'rgba(79, 70, 229, 0.04)'
                  }
                }}
              >
                + Add Other Specialization
              </Button>
            </Box>
          )}
        </Box>
      </Modal>

      <PasswordRecoveryScreen
        open={showPasswordRecovery}
        onClose={() => setShowPasswordRecovery(false)}
        onBackToLogin={() => {
          setShowPasswordRecovery(false);
          setFormData(prev => ({
            ...prev,
            identifier: '',
            password: ''
          }));
        }}
      />
    </>
  );
};

export default AuthScreen; 