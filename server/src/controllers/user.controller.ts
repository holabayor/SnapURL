import { Request, Response } from 'express';
import UserService from './../services/user.service';
import BaseController from './base.controller';
import {
  paginationSchema,
  registerUserSchema,
  userIdSchema,
  userSchema,
} from '../middlewares/validateSchema';

export default class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  async getUser(req: Request, res: Response): Promise<any> {
    const error = this.validate(userIdSchema, req.params);
    if (error) return this.error(res, error, 422);

    const { userId } = req.params;

    const data = await this.userService.getUserById(userId);
    if (!data) return this.error(res, 'Can not retrieve UseR', 404, data);

    this.success(res, 'Successfully retrieved UseR', 200, data);
  }

  async getAllUsers(req: Request, res: Response): Promise<any> {
    const error = this.validate(paginationSchema, req.query);
    if (error) return this.error(res, error, 422);

    const { page, limit } = req.query;

    const data = await this.userService.getAllUsers(
      Number(page) || 1,
      Number(limit) || 2
    );
    if (!data) return this.error(res, 'No data available', 404, data);

    this.success(res, 'Successfully retrieved User', 200, data);
  }

  async createUser(req: Request, res: Response): Promise<any> {
    const error = this.validate(registerUserSchema, req.body);
    if (error) return this.error(res, error, 422);

    const data = await this.userService.createUser(req.body);
    if (data) return this.success(res, 'Successfully shortened URL', 200, data);
    this.error(res, error.message || 'Internal Error', error.statusCode || 500);
  }

  async updateUser(req: Request, res: Response) {
    const error = this.validate(userSchema, req.body);
    if (error) return this.error(res, error, 422);

    const { user } = req as any;

    const data = await this.userService.updateUser(user.id, req.body);
    if (!data) return this.error(res, 'Invalid user Id', 404);

    this.success(res, 'QR Code generated', 200, data);
  }
}
