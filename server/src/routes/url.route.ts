import express from 'express';
import useWrapper from '../utils/wrapper';
import UrlController from '../controllers/url.controller';

// const urlRouter: Router = express.Router();

// urlRouter.post('/short', async (req, res) => {
//   const { originalUrl } = req.body;
//   const baseUrl = process.env.BASE_URL;

//   const urlId = generateId();
//   const urlExists = await Url.findOne({ originalUrl });
//   if (urlExists) {
//     return res.json({ message: 'Url already exists', url: urlExists });
//   }
//   const shortUrl = `${baseUrl}/${urlId}`;
//   const url = await Url.create({
//     urlId,
//     shortUrl,
//     originalUrl,
//   });
//   res.status(200).json({ message: 'Url shortened', url });
// });

// urlRouter.get('/:urlId', async (req, res) => {
//   console.log('The request parameter is ', req.params);
//   try {
//     const { urlId } = req.params;
//     const url = await Url.findOne({ urlId });
//     if (url) {
//       await Url.updateOne(
//         { urlId },
//         {
//           $inc: { click: 1 },
//         }
//       );
//       return res.redirect(url.originalUrl);
//     }
//     return res.status(404).json({ error: 'Not Found' });
//   } catch (error) {
//     res.status(500).send({ error: 'Something went wrong' });
//   }
// });

// export default urlRouter;

class UrlRoutes {
  router = express.Router();
  urlController = new UrlController();
  path = '/urls';

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}/:urlId`,
      useWrapper(this.urlController.getUrl.bind(this.urlController))
    );
    this.router.post(
      `${this.path}/short`,
      useWrapper(this.urlController.shortenUrl.bind(this.urlController))
    );
    this.router.patch(
      `${this.path}/:urlId/qr`,
      useWrapper(this.urlController.generateQR.bind(this.urlController))
    );
  }
}

const urlRoutes = new UrlRoutes();
export default urlRoutes;
