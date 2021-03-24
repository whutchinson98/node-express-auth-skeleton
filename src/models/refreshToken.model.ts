import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
  userId: String,
  accessToken: String,
  refreshToken: String,
  createdAt: {type: Date, default: Date.now},
}, {collection: 'refreshtoken'});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
