import { Request, Response } from 'express';
import UrlService from './../services/url.service';
import BaseController from './base.controller';
import { shortenUrlSchema, urlIdSchema } from '../middlewares/validateSchema';

export default class UrlController extends BaseController {
  private urlService: UrlService;
  private baseUrl: string;

  constructor() {
    super();
    this.urlService = new UrlService();
    this.baseUrl = process.env.BASE_URL as string;
  }

  async shortenUrl(req: Request, res: Response): Promise<any> {
    const error = this.validate(shortenUrlSchema, req.body);
    if (error) return this.error(res, error, 422);

    const data = await this.urlService.shortenUrl(
      this.baseUrl,
      req.body.originalUrl as string
    );
    this.success(res, 'Successfully shortened URL', 200, data);
  }

  async getUrl(req: Request, res: Response): Promise<any> {
    const error = this.validate(urlIdSchema, req.params);
    if (error) return this.error(res, error, 422);

    const { urlId } = req.params;

    const data = await this.urlService.getUrlById(urlId);
    if (!data) return this.error(res, 'Can not retrieve URL', 404, data);

    this.success(res, 'Successfully retrieved URL', 200, data);
  }

  async updateQR(req: Request, res: Response) {
    const error = this.validate(urlIdSchema, req.params);
    if (error) return this.error(res, error, 422);

    const { urlId } = req.params as any;

    const data = await this.urlService.updateQR(urlId);
    if (!data) return this.error(res, 'Invalid url Id', 404);

    this.success(res, 'QR Code generated', 200, data);
  }
}
