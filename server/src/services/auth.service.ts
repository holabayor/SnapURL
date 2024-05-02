import User from '../models/user';
import {
  comparePassword,
  generateOTP,
  generateToken,
  hashPassword,
} from '../utils';
import mailService from './mailing.service';

export default class AuthService {
  async getUserById(id: string) {
    const user = await User.findById(id);
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
    await mailService.sendWelcomeEmail(user.email, user.firstName);
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
      throw { message: 'Incorrect password', statusCode: 403 };

    const hashedPassword = await hashPassword(newPassword);

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { password: hashedPassword },
      { new: true }
    );

    return updatedUser && true;
  }

  async forgotPassword(email: string) {
    const user = await this.getUserByEmail(email);
    if (!user) throw { message: 'User not found', statusCode: 404 };

    // Generate OTP code
    const code = generateOTP();

    const token = await generateToken({
      id: user._id,
      code,
    });

    await mailService.sendResetPasswordEmail(user.email, user.firstName, code);

    return token;
    // const updatedUser = await User.findOneAndUpdate(
    //   { _id: userId },
    //   { password: hashedPassword },
    //   { new: true }
    // );
    // return updatedUser && true;
  }

  async resetPassword(
    payload: { id: string; code: string },
    body: { otpCode: string; newPassword: string }
  ) {
    const { otpCode, newPassword } = body;

    if (payload.code === otpCode) {
      const hashedPassword: string = await hashPassword(newPassword);
      const updatedUser = await this.updateUser(payload.id, {
        password: hashedPassword,
      });
      return updatedUser && true;
    }
    return false;
  }

  async logout(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) throw { message: 'User not found', statusCode: 404 };
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword)
      throw { message: 'Invalid credentials', statusCode: 403 };
    return user;
  }

  async updateUser(userId: string, payload: any): Promise<any> {
    const user = await this.getUserById(userId);

    if (!user) throw new Error('User not found');

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { ...payload },
      { new: true }
    );
    return updatedUser;
  }

  validateToken(token: string) {
    return token;
  }

  async refreshToken(refreshToken: string) {
    return refreshToken;
  }
}
