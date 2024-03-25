import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token)
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  const payload = verifyToken(token);
  (req as any).user.id = payload.id;
  next();
};
export default isAuthenticated;
