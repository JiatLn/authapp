import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const user = new Schema({
  username: String,
  email: String,
  password: String,
  image: {
    type: String,
    required: false,
  },
});

export const User = models.User || mongoose.model('User', user);
