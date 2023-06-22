import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import { registerValidation, loginValidation } from './validations/userValidation.js';
import { checkAuth, handleValidationsErrors } from './middlewares/index.js';
import { userControllers, postControllers } from './controllers/index.js'
import { postValidation } from './validations/postsValidation.js';
import multerMiddleware from './middlewares/multer.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const PORT = process.env.PORT ?? 4000;

const app = express();

app.use(cors());

app.use('/uploads', express.static(__dirname + '/uploads'));


app.use(express.json());

app.get('/me', checkAuth, userControllers.getMe);
app.post('/auth/login', loginValidation, handleValidationsErrors, userControllers.login);
app.post('/auth/register', registerValidation, handleValidationsErrors, userControllers.register);
app.post('/me', checkAuth, userControllers.changeMe);
app.delete('/me/avatar', checkAuth, userControllers.deleteAvatar)

app.post('/uploads', checkAuth, multerMiddleware.single('image'), (req, res) => {
  try {
    if (req.file) {
      res.json({
        url: `/uploads/${req.file?.filename}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post('/posts', checkAuth, postValidation, handleValidationsErrors, postControllers.createPost);
app.get('/posts', postControllers.getAllPosts);
app.get('/posts/:id', postControllers.getOnePost);
app.delete('/posts/:id', checkAuth, postControllers.deletePost);
app.patch('/posts/:id', checkAuth, postControllers.updatePost);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
