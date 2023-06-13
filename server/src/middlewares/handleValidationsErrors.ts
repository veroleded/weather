import { validationResult } from 'express-validator';
import { Request, NextFunction, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error('valdidation error: ', errors.array());

    return res.status(400).json({
      message: 'validation error',
      errors: errors.array(),
    });
  }
  next();
};
