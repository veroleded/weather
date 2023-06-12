import { Response } from "express";
import { validationResult } from 'express-validator';
import dotenv from 'dotenv'
import { RequestCustom } from "../types/requestCustom";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

export const createPost = async (req: RequestCustom, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('post /posts', errors.array())
      return res.status(400).json({
        message: 'validation error',
        errors: errors.array(),
      });
    }
    const post = await prisma.post.create({
      data: {
        ...req.body,
        authorId: req.userId,
      }
    })
    res.json(post);
  } catch (error) {
    console.error(error);
  }
};