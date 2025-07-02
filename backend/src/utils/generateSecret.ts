import crypto from 'crypto';

export const generateJWTSecret = () => {
  // Generate a random buffer of 64 bytes (512 bits)
  const secret = crypto.randomBytes(64).toString('hex');
  console.log('Generated JWT Secret:');
  console.log(secret);
  return secret;
};

// Generate and export the secret
export const JWT_SECRET = generateJWTSecret(); 