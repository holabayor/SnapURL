import express, { Router } from 'express';
import Url from '../models/url';
import useWrapper from '../utils/wrapper';
import { generateId } from '../utils';

const urlRouter: Router = express.Router();

urlRouter.post('/short', async (req, res) => {
  const { originalUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  const urlId = generateId();
  const urlExists = await Url.findOne({ originalUrl });
  if (urlExists) {
    return res.json({ message: 'Url already exists', url: urlExists });
  }
  const shortUrl = `${baseUrl}/${urlId}`;
  const url = await Url.create({
    urlId,
    shortUrl,
    originalUrl,
  });
  res.status(200).json({ message: 'Url shortened', url });
});

urlRouter.get('/:urlId', async (req, res) => {
  console.log('The request parameter is ', req.params);
  try {
    const { urlId } = req.params;
    const url = await Url.findOne({ urlId });
    if (url) {
      await Url.updateOne(
        { urlId },
        {
          $inc: { click: 1 },
        }
      );
      return res.redirect(url.originalUrl);
    }
    return res.status(404).json({ error: 'Not Found' });
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

export default urlRouter;

// export default class UrlRouter {
//   router = express.Router();
//   userController = new UrlController();
//   path = '/url';

//   constructor() {
//     this.initializeRoutes();
//   }

//   initializeRoutes() {
//     this.router.get(`${this.path}/data`, useWrapper(this.urlController.shorten.bind(this.urlController)));
//   }
// }
