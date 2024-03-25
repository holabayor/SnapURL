import User from '../models/user';
import { comparePassword, generateToken, hashPassword } from '../utils';

export default class AuthService {
  async getUserById(id: string) {
    const user = await User.findOne({ id });
    if (user) return user;
    // throw new Error('User not found');
    return null;
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

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword)
      throw { message: 'Invalid credentials', statusCode: 403 };
    const token = generateToken({ id: user.id, firstName: user.firstName });
    return { token, user };
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    const user = await this.getUserById(userId);
    if (!user) throw { message: 'User not found', statusCode: 404 };

    const isValidPassword = await comparePassword(oldPassword, user.password);
    if (!isValidPassword)
      throw { message: 'Invalid credentials', statusCode: 403 };

    const hashedPassword = await hashPassword(newPassword);

    const upd = await User.findOneAndUpdate(
      { id: userId },
      { password: hashedPassword },
      { new: true }
    );
    return upd;
  }

  async logout(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) throw { message: 'User not found', statusCode: 404 };
    const isValidPassword = await comparePassword(password, user.password);
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
    // delete updatedUser!.password;
    return user;
  }
}
