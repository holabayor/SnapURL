import express from 'express';
import useWrapper from '../utils/wrapper';
import UrlController from '../controllers/url.controller';

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
    this.router.get(
      `${this.path}/`,
      useWrapper(this.urlController.getAllUrl.bind(this.urlController))
    );
    this.router.post(
      `${this.path}/short`,
      useWrapper(this.urlController.shortenUrl.bind(this.urlController))
    );
    this.router.patch(
      `${this.path}/:urlId/qr`,
      useWrapper(this.urlController.updateQR.bind(this.urlController))
    );
  }
}

const urlRoutes = new UrlRoutes();
export default urlRoutes;
