import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { PrismaClient, Prisma } from '@prisma/client';
import { RequestCustom } from '../types/requestCustom.js';

dotenv.config();

const tokenKey = process.env.JWT_TOKEN_KEY as jwt.Secret;

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, avatarUrl } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const { passwordHash, ...userData } = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hash,
        avatarUrl: avatarUrl ?? '/uploads/noavatar.png',
      },
    });

    const token = jwt.sign(
      {
        id: userData.id,
      },
      tokenKey,
    );

    res.json({ ...userData, token });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log('post /auth/register error:', error.message);
        return res.status(400).json({
          message: 'User with this email already exists',
          target: error.meta?.target,
        });
      }
      console.error(error);
      return res.status(400).json({
        message: 'db error',
      });
    }
    console.error('post /auth/register error:', error);
    res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { passwordHash, ...user } = await prisma.user.findUniqueOrThrow({
      where: { email },
    });
    const isValidPass = await bcrypt.compare(password, passwordHash);
    if (!isValidPass) {
      console.error('pass and passhash !=');
      return res.status(400).json({
        message: 'Incorrect login or password',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      tokenKey,
    );

    res.json({ ...user, token });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        console.error('post/auth/login', error);
        return res.status(400).json({
          message: 'Incorrect login or password',
        });
      }
    } else {
      console.error(error);
      res.status(500).json({
        message: 'Failed to log in',
      });
    }
  }
};

export const getMe = async (req: RequestCustom, res: Response) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: req.userId,
      },
    });
    res.json(user);
  } catch (error) {
    console.error('get auth/me: ', error);
    res.status(403).json({
      message: 'Access denied',
    });
  }
};
