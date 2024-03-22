import QRCode from 'qrcode';
import Url from '../models/url';
import { generateId } from '../utils';

export default class UrlService {
  private async generateQRCode(data: any) {
    return await QRCode.toDataURL(data);
  }

  async updateQR(urlId: string) {
    const url = await Url.findOne({ urlId });
    if (url && !url?.qrCode) {
      const qrCode = await this.generateQRCode(url.shortUrl);
      return await Url.findOneAndUpdate(
        { urlId },
        { $set: { qrCode: qrCode } },
        { new: true }
      );
    }
    return url;
  }

  async getUrlById(urlId: string) {
    const url = await Url.findOne({ urlId });
    if (url) {
      await Url.updateOne({ urlId }, { $inc: { click: 1 } }, { new: true });
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
