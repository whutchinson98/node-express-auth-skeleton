import jwt from 'jsonwebtoken';

const signToken = (tokenContents: any):string => {
  return jwt.sign(tokenContents, process.env.ACCESS_TOKEN_SECRET as string,
      {expiresIn: process.env.ACCESS_TOKEN_TIME});
};

module.exports = {
  signToken,
};
