import { mongoose } from '../config/db';

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  click: {
    type: Number,
    // required: true,
    default: 0,
  },
  qrCode: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('Url', UrlSchema);
