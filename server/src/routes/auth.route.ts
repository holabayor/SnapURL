import express from 'express';
import useWrapper from '../utils/wrapper';
import AuthController from '../controllers/auth.controller';
import isAuthenticated, { isAuthUser } from '../middlewares/auth';

class AuthRoutes {
  router = express.Router();
  AuthController = new AuthController();
  path = '/auth';

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}/validate-login`,
      isAuthenticated,
      useWrapper(this.AuthController.validateLogin.bind(this.AuthController))
    );
    this.router.get(
      `${this.path}/:id`,
      useWrapper(this.AuthController.getUser.bind(this.AuthController))
    );

    this.router.post(
      `${this.path}/login`,
      useWrapper(this.AuthController.login.bind(this.AuthController))
    );
    this.router.get(
      `${this.path}/validate-token`,
      useWrapper(this.AuthController.validateToken.bind(this.AuthController))
    );

    this.router.post(
      `${this.path}/refresh-token`,
      useWrapper(this.AuthController.refreshToken.bind(this.AuthController))
    );

    this.router.post(
      `${this.path}/change-password`,
      isAuthenticated,
      useWrapper(this.AuthController.changePassword.bind(this.AuthController))
    );

    this.router.post(
      `${this.path}/forgot-password`,
      useWrapper(this.AuthController.forgotPassword.bind(this.AuthController))
    );

    this.router.post(
      `${this.path}/reset-password`,
      isAuthUser,
      useWrapper(this.AuthController.resetPassword.bind(this.AuthController))
    );

    this.router.post(
      `${this.path}/logout`,
      useWrapper(this.AuthController.logout.bind(this.AuthController))
    );
  }
}

const authRoutes = new AuthRoutes();
export default authRoutes;
