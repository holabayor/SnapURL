import { Request, Response } from 'express';
import AuthService from './../services/auth.service';
import UserService from '../services/user.service';
import BaseController from './base.controller';
import {
  loginSchema,
  registerSchema,
  userIdSchema,
} from '../middlewares/validateSchema';

export default class AuthController extends BaseController {
  private userService: UserService;
  private authService: AuthService;

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

    this.success(res, 'Successfully retrieved UseR', 200, data);
  }

  async register(req: Request, res: Response): Promise<any> {
    const error = this.validate(registerSchema, req.body);
    if (error) return this.error(res, error, 422);

    const data = await this.userService.createUser(req.body);
    if (data) return this.success(res, 'Successfully shortened URL', 200, data);
    this.error(res, error.message || 'Internal Error', error.statusCode || 500);
  }

  async login(req: Request, res: Response): Promise<any> {
    const error = this.validate(loginSchema, req.body);
    if (error) return this.error(res, error, 422);

    const { email, password } = req.body;
    const data = await this.authService.login(email, password);
    res.cookie('SESSION', data.token, { httpOnly: true });
    if (data) return this.success(res, 'Log in successful', 200, data.user);
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

  async refreshToken(req: Request, res: Response): Promise<any> {
    const { refreshToken } = req.body; // Refresh token sent in request body or headers
    try {
      const newToken = await this.authService.refreshToken(refreshToken);
      res.cookie('SESSION', newToken, { httpOnly: true }); // Optionally set new token as cookie
      this.success(res, 'Token refreshed successfully', 200, {
        token: newToken,
      });
    } catch (error) {
      this.error(res, 'Failed to refresh token', 401);
    }
  }
}
