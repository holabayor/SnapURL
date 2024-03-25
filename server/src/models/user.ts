import { mongoose } from '../config/db';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  urls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Url',
    },
  ],
  lastLoggedIn: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('User', UserSchema);
