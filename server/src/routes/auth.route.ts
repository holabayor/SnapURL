import express from 'express';
import useWrapper from '../utils/wrapper';
import AuthController from '../controllers/auth.controller';

class AuthRoutes {
  router = express.Router();
  AuthController = new AuthController();
  path = '/auth';

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}/:id`,
      useWrapper(this.AuthController.getUser.bind(this.AuthController))
    );

    this.router.post(
      `${this.path}/login`,
      useWrapper(this.AuthController.login.bind(this.AuthController))
    );
  }
}

const authRoutes = new AuthRoutes();
export default authRoutes;
