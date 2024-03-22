import QRCode from 'qrcode';
import Url from '../models/url';
import { generateId } from '../utils';

export default class UrlService {
  async generateQR(urlId: string) {
    console.log('The url id is ', urlId);
    const url = await Url.findOne({ urlId });
    console.log('The url ', url);
    const qrCode = await QRCode.toDataURL(url!.shortUrl);
    console.log(qrCode);
    if (qrCode) {
      await Url.updateOne({ urlId }, { qrCode: qrCode });
      return url;
    }
    return null;
  }

  async getUrlById(urlId: string) {
    const url = await Url.findOne({ urlId });
    if (url) {
      await Url.updateOne({ urlId }, { $inc: { click: 1 } });
      return url;
    }
    return null;
  }

  async shortenUrl(baseUrl: string, originalUrl: string): Promise<any> {
    if (!originalUrl.startsWith('https://' || 'http://')) {
      originalUrl = 'https://' + originalUrl;
    }
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
