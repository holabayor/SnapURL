import { Request, Response } from 'express';
import UrlService from './../services/url.service';
import BaseController from './base.controller';

export default class UrlController extends BaseController {
  private urlService: UrlService;
  private baseUrl: string;

  constructor() {
    super();
    this.urlService = new UrlService();
    this.baseUrl = process.env.BASE_URL as string;
  }

  async shortenUrl(req: Request, res: Response): Promise<any> {
    const originalUrl = (req.body as any).originalUrl;
    const data = await this.urlService.shortenUrl(this.baseUrl, originalUrl);
    this.success(res, 'Successfully shortened URL', 200, data);
  }

  async getUrl(req: Request, res: Response): Promise<any> {
    const { urlId } = req.params;
    const data = await this.urlService.getUrlById(urlId);
    // res.redirect(url!.originalUrl);
    this.success(res, 'Successfully retrieved URL', 200, data);
  }

  async generateQR(req: Request, res: Response) {
    console.log(req.params);
    const { urlId } = req.params as any;
    const data = await this.urlService.generateQR(urlId);
    this.success(res, 'Successfully shortened URL', 200, data);
  }
}
