import express, { Express, Router } from 'express';
import http from 'http';
import { connectDB } from './config/db';
import routes from './routes/index';

export class Server {
  private app: Express;
  private server: http.Server;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '5000');
    this.server = http.createServer(this.app);
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  //   public initializeRoutes(route: Routes[]): void {
  //     this.app.use('/api/v1/', route.router);
  //   }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(routes: Router[]): void {
    routes.forEach((route: Router) => this.app.use('/api/v1/', route));
  }

  // Method to start listening on defined port
  private listen(): void {
    this.server.listen(this.port, () => {
      console.log(`⚡️Server is running on port ${this.port}`);
    });

    // Handle server errors
    this.server.on('error', (error: NodeJS.ErrnoException) => {
      console.error('❌Server error:', error.message);
      process.exit(1);
    });
  }

  // Method to start the application
  public async start(): Promise<void> {
    // Connect to MongoDB
    await connectDB();
    this.listen();
  }
}
