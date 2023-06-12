import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

import { RequestCustom } from '../types/requestCustom';

dotenv.config();

export default async (req: RequestCustom, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization ?? '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY as jwt.Secret);
      const { id } = decoded as JwtPayload;
      req.userId = id;
      next();
    } catch (error) {
      console.error('checkAuth:', error);
      res.status(403).json({
        message: 'Access denied',
      });
    }
  }
};
