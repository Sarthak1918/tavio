import mongoose, { Schema, models } from 'mongoose';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
  isPublic: {
    type: Boolean,
    default: false,
  },
  thumbnail: String,
});

export default models.Project || mongoose.model('Project', ProjectSchema);