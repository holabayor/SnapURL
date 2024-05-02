import { Request, Response } from 'express';
import AuthService from './../services/auth.service';
import UserService from '../services/user.service';
import BaseController from './base.controller';
import {
  changePasswordSchema,
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  userIdSchema,
} from '../middlewares/validateSchema';
import { CustomRequest } from '../@types';

export default class AuthController extends BaseController {
  private userService: UserService;
  private authService: AuthService;
  private tokenName = process.env.ACCESS_TOKEN_NAME as string;
  private pwdToken = process.env.PASSWORD_COOKIE_NAME as string;

  constructor() {
    super();
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  async getUser(req: Request, res: Response): Promise<any> {
    const error = this.validate(userIdSchema, req.params);
    if (error) return this.error(res, error, 422);

    const { userId } = req.params;

    const data = await this.userService.getUserById(userId);
    if (!data) return this.error(res, 'Can not retrieve UseR', 404, data);

    this.success(res, 'Successfully retrieved User', 200, data);
  }

  async register(req: Request, res: Response): Promise<any> {
    const error = this.validate(registerSchema, req.body);
    if (error) return this.error(res, error, 422);

    const data = await this.userService.createUser(req.body);
    if (data) return this.success(res, 'User created', 200, data);
    this.error(res, error.message || 'Internal Error', error.statusCode || 500);
  }

  async login(req: Request, res: Response): Promise<any> {
    const error = this.validate(loginSchema, req.body);
    if (error) return this.error(res, error, 422);

    const { email, password } = req.body;
    const { token, user } = await this.authService.login(email, password);
    if (user) {
      res.cookie(this.tokenName, token, {
        httpOnly: true,
      });
      return this.success(res, 'Log in successful', 200, user);
    }
  }

  async validateToken(req: Request, res: Response): Promise<any> {
    const { token } = req.body;
    try {
      const decoded = await this.authService.validateToken(token);
      this.success(res, 'Token is valid', 200, { user: decoded });
    } catch (error) {
      this.error(res, 'Invalid token', 401);
    }
  }

  async validateLogin(req: Request, res: Response): Promise<any> {
    const userId = (req as any).user.id as string;
    try {
      const user = await this.authService.getUserById(userId);
      this.success(res, 'Login validated', 200, user);
    } catch (error) {
      this.error(res, 'User logged out', 401);
    }
  }

  async refreshToken(req: Request, res: Response): Promise<any> {
    const { refreshToken } = req.body; // Refresh token sent in request body or headers
    try {
      const newToken = await this.authService.refreshToken(refreshToken);
      res.cookie(this.tokenName, newToken, {
        httpOnly: true,
      }); // Optionally set new token as cookie
      this.success(res, 'Token refreshed successfully', 200, {
        token: newToken,
      });
    } catch (error) {
      this.error(res, 'Failed to refresh token', 401);
    }
  }

  async changePassword(req: Request, res: Response): Promise<any> {
    const error = this.validate(changePasswordSchema, req.body);
    if (error) return this.error(res, error, 422);

    const userId = (req as any).user.id as string;
    const { oldPassword, newPassword } = req.body;

    const success = await this.authService.changePassword(
      userId,
      oldPassword,
      newPassword
    );
    if (success) {
      return this.success(res, 'Password changed successfully', 200);
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<any> {
    const error = this.validate(emailSchema, req.body);
    if (error) return this.error(res, error, 422);

    const { email } = req.body;

    const token = await this.authService.forgotPassword(email);
    if (token) {
      res.cookie(this.pwdToken, token, {
        maxAge: 600000,
        httpOnly: true,
      });
      return this.success(
        res,
        'Password reset link sent to mail successfully',
        200
      );
    }
  }

  async resetPassword(req: Request, res: Response): Promise<any> {
    const error = this.validate(resetPasswordSchema, req.body);
    if (error) return this.error(res, error, 422);

    const payload = (req as any).user;

    const success = await this.authService.resetPassword(payload, req.body);
    if (success) {
      // Clear all cookies from the server to ensure a fresh login process.
      res.clearCookie(this.pwdToken);
      res.clearCookie(this.tokenName);
      return this.success(res, 'Password changed successfully', 200);
    }
    return this.success(res, 'Invalid OTP code', 401);
  }

  async logout(req: Request, res: Response): Promise<any> {
    try {
      // Clear the HTTP-only cookie
      res.clearCookie(this.tokenName);

      return this.success(res, 'Logged out successfully', 200);
    } catch (error) {
      // console.error('Logout failed:', error);
      return this.error(res, 'Failed to log out', 500);
    }
  }
}
