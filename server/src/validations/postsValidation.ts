import { body } from 'express-validator';

export const postValidation = [
  body('title', 'Incorrect format').isLength({ min: 3 }).isString(),
  body('content', 'Must be a string').optional().isString(),
  body('published', 'Must be boolean').isBoolean(),
];