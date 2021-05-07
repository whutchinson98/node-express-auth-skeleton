import {model, Schema, Model, Document} from 'mongoose';

interface IRefreshToken extends Document {
  userId:string;
  accessToken:string;
  refreshToken:string;
  createdAt:Date;
};

const RefreshTokenSchema:Schema = new Schema({
  userId: {type: String, required: true},
  accessToken: {type: String, required: true},
  refreshToken: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
}, {collection: 'refreshtoken'});

const RefreshToken:Model<IRefreshToken> = model('RefreshToken',
    RefreshTokenSchema);
export {RefreshToken};
