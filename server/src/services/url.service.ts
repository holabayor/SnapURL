import Url from '../models/url';
import { generateId } from '../utils';

export default class UrlService {
  async getUrlById(urlId: string): Promise<string | null> {
    const url = await Url.findOne({ urlId });
    if (url) {
      await Url.updateOne({ urlId }, { $inc: { click: 1 } });
      return url.originalUrl;
    }
    return null;
  }

  async shortenUrl(baseUrl: string, originalUrl: string): Promise<any> {
    const urlId = generateId();
    const urlExists = await Url.findOne({ originalUrl });

    if (urlExists) return urlExists;

    const shortUrl = `${baseUrl}/${urlId}`;
    const url = await Url.create({
      urlId,
      shortUrl,
      originalUrl,
    });
    return url;
  }
}
