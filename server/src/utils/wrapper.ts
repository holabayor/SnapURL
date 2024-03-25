import { NextFunction, Request, Response } from 'express';

export default function useWrapper(fn: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log('Caught in the wrapper');
      const code = (error as any).statusCode || 500;
      return res
        .status(code)
        .json({ success: false, message: (error as any).message });
      // next(error);
    }
  };
}
