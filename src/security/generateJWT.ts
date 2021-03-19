import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

exports.generateAuthJWT = (id: string) => {
  return jwt.sign({id: id},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '1800s'});
};
