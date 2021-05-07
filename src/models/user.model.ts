import {model, Schema, Model, Document} from 'mongoose';

interface IUser extends Document {
  username:string;
  password:string;
};

const UserSchema:Schema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
}, {collection: 'user'});

const User: Model<IUser> = model('User', UserSchema);
export {User};
