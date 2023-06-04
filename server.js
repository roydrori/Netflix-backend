import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import seedRouter from './routes/seedRouter.js';
import contentRouter from './routes/contentRoutes.js';
import listsRouter from './routes/listRoutes.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/content', contentRouter);
app.use('/api/list', listsRouter);
app.use('/api/auth', authRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log('server is running on port ' + port);
    });
    console.log('Server connected to DB');
  })
  .catch((err) => {
    console.log('Connecting to DB failed: ' + err.message);
  });
