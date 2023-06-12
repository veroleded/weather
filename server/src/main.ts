import express from 'express';
import dotenv from 'dotenv';

import { registerValidation, loginValidation } from './validations/userValidation.js';
import checkAuth from './middlewares/checkAuth.js';
import * as userControllers from './controllers/userControllers.js';
import * as postControllers from './controllers/postControllers.js';
import { postValidation } from './validations/postsValidation.js';

dotenv.config();

const PORT = process.env.PORT ?? 4000;

const app = express();

app.use(express.json());

app.get('/auth/me', checkAuth, userControllers.getMe);
app.post('/auth/login', loginValidation, userControllers.login);
app.post('/auth/register', registerValidation, userControllers.register);

app.post('/posts', postValidation, checkAuth, postControllers.createPost)


app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
