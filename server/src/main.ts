import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { PrismaClient, Prisma } from '@prisma/client';

import { registerValidation } from './validations/auth.js';

const prisma = new PrismaClient();

const tokenKey = 'userId';

const PORT = process.env.PORT ?? 4000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ a: 'asd' });
});

app.post('/auth/register', registerValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { email, password, name, avatarUrl } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        avatarUrl,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      tokenKey,
    );

    res.json({ ...user, token });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log(error.message)
        res.status(400).json({
          message: 'User with this email already exists',
          target: error.meta?.target,
        });
      } else {
        console.error(error);
        res.status(400).json({
          message: 'db error'
        })
      }
    } else {
      console.error('post /auth/register error:', error);
      res.status(500).json({ error });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
