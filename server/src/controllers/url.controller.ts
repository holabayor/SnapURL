import UrlService from './../services/url.service';

export default class UrlController {
  private urlService: UrlService;
  private baseUrl: string;

  constructor() {
    this.urlService = new UrlService();
    this.baseUrl = process.env.BASE_URL as string;
  }

  async shortenUrl(originalUrl: string): Promise<any> {
    return await this.urlService.shortenUrl(this.baseUrl, originalUrl);
  }

  async redirectUrl(urlId: string): Promise<any> {
    return await this.urlService.getUrlById(urlId);
  }
}
