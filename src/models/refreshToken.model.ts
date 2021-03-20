import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
  userId: String,
  accessToken: String,
  refreshToken: String,
}, {collection: 'refreshtoken'});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
