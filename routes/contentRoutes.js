import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Content from '../models/contentScheme.js';
import { isAuth } from '../utils.js';

const contentRouter = express.Router();

contentRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    try {
      const data = await Content.find();

      res.status(200).json(data.reverse());
    } catch (err) {
      console.log(err);
    }
  })
);

contentRouter.get(
  '/search',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const query = req.query.query;
    const genre = req.query.genre;
    try {
      let options = {};
      if (query) options.title = { $regex: query, $options: 'i' };
      if (genre) options.genre = genre;

      const data = await Content.find(options);

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

contentRouter.get(
  '/random',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const type = req.query.type;
    let content;
    try {
      if (type === 'series') {
        content = await Content.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else if (type === 'movies') {
        content = await Content.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      } else {
        content = await Content.aggregate([{ $sample: { size: 1 } }]);
      }
      res.status(200).json(content[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  })
);

contentRouter.get(
  '/get/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const data = await Content.findById(req.params.id);

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

export default contentRouter;
