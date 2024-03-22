import { Response } from 'express';

export default class SendResponse {
  error(
    res: Response,
    // code: string,
    message: string,
    statusCode: number,
    data?: any
  ) {
    const response = {
      success: false,
      //   code: code ?? 'error',
      message: message ?? 'error',
      data,
    };
    return res.status(statusCode).json(response);
  }

  success(
    res: Response,
    // code: string,
    message: string,
    statusCode: number = 200,
    data?: any
  ) {
    const response = {
      success: true,
      //   code: code ?? 'success',
      message: message ?? 'success',
      data,
    };
    return res.status(statusCode).json(response);
  }
}
