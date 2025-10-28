import express from 'express';
import { connectDB } from './config/db.js';
import auth from './routes/authRouter.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', auth);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});