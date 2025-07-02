"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
  Fade,
  Fab,
  Zoom,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const ChatButton = styled(Fab)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(45deg, #1976d2, #2196f3);
  color: white;
  box-shadow: 0 4px 20px rgba(33, 150, 243, 0.3);
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(33, 150, 243, 0.4);
  }
`;

const ChatContainer = styled(motion(Paper))`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 500px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
`;

const ChatHeader = styled(Box)`
  background: linear-gradient(45deg, #1976d2, #2196f3);
  color: white;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ChatMessages = styled(Box)`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(255, 255, 255, 0.8);
`;

const MessageBubble = styled(motion(Box))<{ isUser: boolean }>`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  background: ${props => props.isUser 
    ? 'linear-gradient(45deg, #1976d2, #2196f3)' 
    : 'linear-gradient(45deg, #f5f5f5, #ffffff)'};
  color: ${props => props.isUser ? 'white' : '#333'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    ${props => props.isUser ? 'right: -20px' : 'left: -20px'};
    width: 20px;
    height: 20px;
    background: ${props => props.isUser 
      ? 'linear-gradient(45deg, #1976d2, #2196f3)' 
      : 'linear-gradient(45deg, #f5f5f5, #ffffff)'};
    transform: translateY(-50%);
    clip-path: ${props => props.isUser 
      ? 'polygon(0 0, 100% 50%, 0 100%)' 
      : 'polygon(100% 0, 100% 100%, 0 50%)'};
  }
`;

const InputContainer = styled(Box)`
  padding: 16px;
  background: rgba(255, 255, 255, 0.9);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 8px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.9);
    &:hover {
      background: rgba(255, 255, 255, 1);
    }
  }
`;

const SendButton = styled(IconButton)`
  background: linear-gradient(45deg, #1976d2, #2196f3);
  color: white;
  &:hover {
    background: linear-gradient(45deg, #1565c0, #1976d2);
  }
`;

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface EmergencyChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyChatbot({ isOpen, onClose }: EmergencyChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your emergency medical assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeSymptoms = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    const emergencyKeywords = [
      "heart attack", "stroke", "unconscious", "not breathing",
      "severe bleeding", "choking", "severe chest pain",
      "severe difficulty breathing", "severe allergic reaction"
    ];
    
    const urgentKeywords = [
      "high fever", "severe pain", "vomiting", "dizziness",
      "confusion", "severe headache", "severe abdominal pain",
      "severe injury", "severe burn"
    ];

    if (emergencyKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "🚨 This is a medical emergency! Please call emergency services (1122) immediately. Stay calm and follow their instructions.";
    }

    if (urgentKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "⚠️ This appears to be an urgent medical condition. Please seek immediate medical attention at the nearest emergency room or urgent care center.";
    }

    if (lowerMessage.includes("headache")) {
      return "For headaches, try resting in a quiet, dark room. Take over-the-counter pain relievers if appropriate. If the headache is severe or persistent, consult a healthcare provider.";
    }

    if (lowerMessage.includes("fever")) {
      return "For fever, rest and stay hydrated. Take fever-reducing medication if appropriate. If the fever is high (above 103°F/39.4°C) or persists, seek medical attention.";
    }

    if (lowerMessage.includes("cough")) {
      return "For cough, stay hydrated and rest. Consider over-the-counter cough medicine if appropriate. If the cough is severe or persists, consult a healthcare provider.";
    }

    if (lowerMessage.includes("stomach pain")) {
      return "For stomach pain, avoid solid foods and stay hydrated. If the pain is severe or persistent, seek medical attention.";
    }

    return "I understand you're experiencing medical symptoms. Please provide more details about your condition, and I'll help guide you on the next steps. Remember, if this is a life-threatening emergency, call emergency services immediately.";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = analyzeSymptoms(input);
      
      const botMessage: Message = {
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        text: "I apologize, but I'm having trouble processing your request. Please try again or contact emergency services directly by calling 1122if this is a life-threatening situation.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChatButton
              color="primary"
              aria-label="open chat"
              onClick={() => onClose()}
            >
              <SmartToyIcon />
            </ChatButton>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <ChatContainer
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChatHeader>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'white', color: '#1976d2' }}>
                  <SmartToyIcon />
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Emergency Medical Assistant
                </Typography>
              </Box>
              <IconButton
                size="small"
                sx={{ color: 'white' }}
                onClick={() => onClose()}
              >
                <CloseIcon />
              </IconButton>
            </ChatHeader>
            
            <ChatMessages>
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                      <Avatar sx={{ 
                        bgcolor: message.isUser ? 'primary.main' : 'grey.300',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        {message.isUser ? <PersonIcon /> : <SmartToyIcon />}
                      </Avatar>
                      <MessageBubble isUser={message.isUser}>
                        <Typography variant="body2">{message.text}</Typography>
                        <Typography variant="caption" sx={{ 
                          opacity: 0.7, 
                          display: 'block', 
                          mt: 0.5,
                          color: message.isUser ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)'
                        }}>
                          {message.timestamp.toLocaleTimeString()}
                        </Typography>
                      </MessageBubble>
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'grey.300' }}>
                    <SmartToyIcon />
                  </Avatar>
                  <CircularProgress size={20} />
                </Box>
              )}
              <div ref={messagesEndRef} />
            </ChatMessages>

            <InputContainer>
              <StyledTextField
                fullWidth
                variant="outlined"
                placeholder="Describe your emergency..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <SendButton 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
              >
                <SendIcon />
              </SendButton>
            </InputContainer>
          </ChatContainer>
        )}
      </AnimatePresence>
    </>
  );
} 