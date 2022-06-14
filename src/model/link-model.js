import mongoose from 'mongoose';

const Link = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  share: {
    type: Boolean,
    require: true,
    default: false,
  },
});

export default mongoose.model('Link', Link);
