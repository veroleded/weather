import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Incorrect format').isEmail(),
  body('password', 'Minimum 8 characters').isLength({ min: 8 }),
  body('name', 'Minimum 3 characters').isLength({ min: 3 }),
  body('avatarUrl', 'Must be Url').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Incorrect format').isEmail(),
  body('password', 'Minimum 8 characters').isLength({ min: 8 }),
]
