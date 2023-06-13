import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { RequestCustom } from '../types/requestCustom';
import { Prisma, PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

export const createPost = async (req: RequestCustom, res: Response) => {
  try {
    const post = await prisma.post.create({
      data: {
        ...req.body,
        authorId: req.userId,
      },
    });

    res.json(post);
  } catch (error) {
    console.error('post /posts :', error);

    res.status(500).json({
      mesage: "Something's wrong, server error",
    });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
    });

    res.json(posts);
  } catch (error) {
    console.error('get /posts :', error);

    res.status(500).json({
      message: "Something's wrong, server error",
    });
  }
};

export const getOnePost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.post.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
    const post = await prisma.post.findUnique({
      where: { id },
    });
    res.json(post);
  } catch (error) {
    console.error(`get post/${id} :`, error);
    res.status(404).json({
      message: 'Post is not found',
    });
  }
};

export const deletePost = async (req: RequestCustom, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.userId;
  console.log(123)
  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (post.authorId === userId) {
      await prisma.post.delete({
        where: {
          id,
        },
      });

      return res.json({
        message: 'Post deleted',
      });
    }
    res.status(403).json({
      message: 'You can not delete this post',
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        console.error(`delete posts/${id} :`, error);
        res.status(403).json({
          message: 'Post is not found'
        })
      }
    }
    console.error(`delete posts/${id} :`, error);
    res.status(500).json({
      message: 'Failed to delete post',
    });
  }
};

export const updatePost = async (req: RequestCustom, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.userId;
  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (post.authorId === userId) {
      const updatedPost = await prisma.post.update({
        where: {
          id,
        },
        data: {
          ...req.body,
        },
      });

      return res.json(updatedPost);
    }
    res.status(403).json({
      message: 'You can not update this post',
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        console.error(`patch posts/${id} :`, error);
        res.status(403).json({
          message: 'Post is not found'
        })
      }
     }
    console.error(`patch posts/${id} :`, error);
    res.status(500).json({
      message: 'Failed to update post',
    });
  }
};