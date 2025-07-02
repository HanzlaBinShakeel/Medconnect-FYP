import React from "react";
import { Box, Modal, Paper, TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

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

  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;
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

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
  
  .MuiOutlinedInput-root {
    border-radius: 12px;
    background: #f8fafc;
    
    &:hover fieldset {
      border-color: #4f46e5;
    }
    
    &.Mui-focused fieldset {
      border-color: #4f46e5;
    }
  }
  
  .MuiInputLabel-root {
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

interface PasswordRecoveryScreenProps {
  open: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

const PasswordRecoveryScreen: React.FC<PasswordRecoveryScreenProps> = ({
  open,
  onClose,
  onBackToLogin
}) => {
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [recoveryMethod, setRecoveryMethod] = React.useState<"email" | "phone">("email");
  const [error, setError] = React.useState("");

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (recoveryMethod === "email" && !email) {
      setError("Please enter your email address");
      return;
    }

    if (recoveryMethod === "phone" && !phoneNumber) {
      setError("Please enter your phone number");
      return;
    }

    try {
      // Here you would make an API call to send OTP via email or SMS
      // For now, we'll just simulate it
      setStep(2);
    } catch (err) {
      setError("Failed to send verification code. Please try again.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the verification code");
      return;
    }

    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Here you would make an API call to verify OTP and reset password
      // For now, we'll just simulate it
      onClose();
      onBackToLogin();
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="password-recovery-modal"
      aria-describedby="password-recovery-form"
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
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#1e293b", fontFamily: "'Poppins', sans-serif" }}>
            Reset Password
          </Typography>
        </ModalHeader>

        {step === 1 && (
          <form onSubmit={handleRequestReset}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 2, color: "#64748b", fontFamily: "'Poppins', sans-serif" }}>
                Choose recovery method:
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                  variant={recoveryMethod === "email" ? "contained" : "outlined"}
                  onClick={() => setRecoveryMethod("email")}
                  sx={{
                    flex: 1,
                    textTransform: 'none',
                    borderRadius: '12px',
                    bgcolor: recoveryMethod === "email" ? "#4f46e5" : "transparent",
                    color: recoveryMethod === "email" ? "white" : "#4f46e5",
                    borderColor: "#4f46e5",
                    '&:hover': {
                      bgcolor: recoveryMethod === "email" ? "#4338ca" : "rgba(79, 70, 229, 0.04)",
                      borderColor: "#4f46e5"
                    }
                  }}
                >
                  Email
                </Button>
                <Button
                  variant={recoveryMethod === "phone" ? "contained" : "outlined"}
                  onClick={() => setRecoveryMethod("phone")}
                  sx={{
                    flex: 1,
                    textTransform: 'none',
                    borderRadius: '12px',
                    bgcolor: recoveryMethod === "phone" ? "#4f46e5" : "transparent",
                    color: recoveryMethod === "phone" ? "white" : "#4f46e5",
                    borderColor: "#4f46e5",
                    '&:hover': {
                      bgcolor: recoveryMethod === "phone" ? "#4338ca" : "rgba(79, 70, 229, 0.04)",
                      borderColor: "#4f46e5"
                    }
                  }}
                >
                  Phone
                </Button>
              </Box>
            </Box>

            {recoveryMethod === "email" ? (
              <StyledTextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            ) : (
              <StyledTextField
                fullWidth
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            )}

            {error && (
              <Typography color="error" sx={{ mb: 2, fontSize: "14px", fontFamily: "'Poppins', sans-serif" }}>
                {error}
              </Typography>
            )}

            <StyledButton
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#4f46e5",
                '&:hover': {
                  bgcolor: "#4338ca"
                }
              }}
            >
              Send Verification Code
            </StyledButton>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <StyledTextField
              fullWidth
              label="Verification Code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter verification code"
              required
            />

            <StyledTextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />

            <StyledTextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />

            {error && (
              <Typography color="error" sx={{ mb: 2, fontSize: "14px", fontFamily: "'Poppins', sans-serif" }}>
                {error}
              </Typography>
            )}

            <StyledButton
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#4f46e5",
                '&:hover': {
                  bgcolor: "#4338ca"
                }
              }}
            >
              Reset Password
            </StyledButton>
          </form>
        )}

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            onClick={onBackToLogin}
            sx={{
              color: "#64748b",
              textTransform: "none",
              fontFamily: "'Poppins', sans-serif",
              '&:hover': {
                color: "#4f46e5"
              }
            }}
          >
            Back to Login
          </Button>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default PasswordRecoveryScreen; 