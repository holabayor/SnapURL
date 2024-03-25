import User from '../models/user';
import { comparePassword, hashPassword } from '../utils';

export default class UserService {
  async getUserById(id: string) {
    const user = await User.findOne({ id });
    if (user) return user;
    // throw new Error('User not found');
    return null;
  }

  async getAllUsers(page: number, limit: number): Promise<any> {
    const skip: number = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limit);
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({ email });
    if (user) return user;
    return null;
  }

  async createUser(payload: any): Promise<any> {
    const userExists = await this.getUserByEmail(payload.email);

    if (userExists) throw { message: 'User already exists', statusCode: 409 };

    const hashedPassword = await hashPassword(payload.password);
    const user = await User.create({ ...payload, password: hashedPassword });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) throw { message: 'User not found', statusCode: 404 };
    const isValidPassword = await comparePassword(user.password, password);
    if (!isValidPassword)
      throw { message: 'Invalid credentials', statusCode: 403 };
    return user;
  }

  async updateUser(id: string, payload: any): Promise<any> {
    const user = await this.getUserById(id);

    if (!user) throw new Error('User not found');

    const updatedUser = await User.findOneAndUpdate(
      { id },
      { ...payload },
      { new: true }
    );

    const hashedPassword = await hashPassword(payload.password);
    // const user = await User.create({ ...payload, hashedPassword });
    return user;
  }
}
