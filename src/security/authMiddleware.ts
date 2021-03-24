import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import {UserAuthRequest} from '../definitions/userAuthRequest';
import {Response} from 'express';

exports.auth = async (req: UserAuthRequest, res: Response, next) => {
  const authHeader = req.cookies.auth.refreshToken;

  const token = req.body.token ||
                req.query.token ||
                authHeader;

  if (req.body.privateKey &&
      process.env.ADMIN_PRIVATE_KEY === req.body.privateKey) {
    return next();
  }

  if (token == null) {
    return res.status(400).json({
      error: true,
      message: 'no token sent',
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          console.log(err);
          return res.status(401).json({
            error: true,
            message: 'invalid auth token',
          });
        }

        req.user = user;

        next();
      });
};
