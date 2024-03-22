import dotenv from 'dotenv';
dotenv.config();
import { Server } from './server';
import UrlRouter from './routes/url.route';

if (!process.env.NODE_ENV || process.env.NODE_ENV.trim() !== 'production') {
  const fs = require('fs');
  const path = require('path');
  const envFilePath = path.resolve(__dirname, '..', '.env');
  if (!fs.existsSync(envFilePath)) {
    console.error(
      'ERROR: No .env file found. Please create a .env file based on .env.example.'
    );
    process.exit(1);
  }
}

// Create an instance of the App class
const server = new Server();

// server.initializeRoutes([new UrlRouter()]);

// Start the application
server.start();
