import jwt from 'jsonwebtoken';
import {User} from '../src/models/user.model';
const bcrypt = require('bcrypt');
import {generateAuthJWT} from '../src/security/generateJWT';

const createUser = async () => {
  const user = new User({
    username: 'will',
    password: bcrypt.hashSync('password',
        bcrypt.genSaltSync(10)),
  });

  await user.save();

  const tokens = await generateAuthJWT(user.id);
  return {user, tokens};
};
const signToken = (tokenContents: any):string => {
  return jwt.sign(tokenContents, process.env.ACCESS_TOKEN_SECRET as string,
      {expiresIn: process.env.ACCESS_TOKEN_TIME});
};

module.exports = {
  signToken,
  createUser,
};
