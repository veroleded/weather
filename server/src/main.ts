import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';

import { registerValidation, loginValidation } from './validations/userValidation.js';
import { checkAuth, handleValidationsErrors } from './middlewares/index.js';
import { userControllers, postControllers } from './controllers/index.js'
import { postValidation } from './validations/postsValidation.js';
import { RequestCustom } from './types/requestCustom.js';

dotenv.config();

const PORT = process.env.PORT ?? 4000;

const app = express();

app.use(cors());

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, 'uploads');
  },
  filename(_, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.get('/auth/me', checkAuth, userControllers.getMe);
app.post('/auth/login', loginValidation, handleValidationsErrors, userControllers.login);
app.post('/auth/register', registerValidation, handleValidationsErrors, userControllers.register);

app.post('/upload', checkAuth, upload.single('image'), (req: RequestCustom, res) => {
  res.json({
    url: `/uploads/${req.file?.originalname}`,
  });
});

app.post('/posts', checkAuth, postValidation, handleValidationsErrors, postControllers.createPost);
app.get('/posts', postControllers.getAllPosts);
app.get('/posts/:id', postControllers.getOnePost);
app.delete('/posts/:id', checkAuth, postControllers.deletePost);
app.patch('/posts/:id', checkAuth, postControllers.updatePost);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
