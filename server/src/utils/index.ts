import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

//Function to generate a random id
export const generateId = (length: number = 5): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

// Function to hash a password using bcrypt
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Number of salt rounds
  return bcrypt.hash(password, saltRounds);
};

// Function to compare a password with its hash using bcrypt
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// Function to generate a JWT token
export const generateToken = (payload: any): string => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Function to verify a JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Example usage:
export const authenticateUser = async (
  username: string,
  password: string
): Promise<string | null> => {
  // Retrieve hashed password from the database based on the username
  const hashedPassword = 'hashed-password-retrieved-from-database';

  // Compare the provided password with the hashed password
  const passwordMatch = await comparePassword(password, hashedPassword);
  if (!passwordMatch) {
    return null; // Passwords do not match
  }

  // Generate a JWT token containing user information
  const token = generateToken({ username: username });
  return token;
};

// Example usage:
export const verifyUserToken = async (token: string): Promise<any> => {
  // Verify the JWT token
  const decodedToken = verifyToken(token);
  return decodedToken;
};
