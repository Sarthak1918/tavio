import mongoose, { Schema, models } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.User || mongoose.model('User', UserSchema);