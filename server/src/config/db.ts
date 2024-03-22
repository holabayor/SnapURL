import mongoose from 'mongoose';

// MongoDB connection URI based on environment
const getMongoUri = (): string => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env.PRODUCTION_MONGODB_URI || '';
    case 'staging':
      return process.env.STAGING_MONGODB_URI || '';
    default:
      return process.env.MONGODB_URI || '';
  }
};

// Connect to MongoDB
const connectDB = async (): Promise<void> => {
  const mongodbUri = getMongoUri();

  if (!mongodbUri) {
    console.error('MongoDB URI not found in environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongodbUri);

    console.log('🚀 Connected to MongoDB');
  } catch (error) {
    console.error('❌Failed to connect to MongoDB');
    process.exit(1);
  }
};

// Export connected MongoDB connection and instance
export { connectDB, mongoose };
