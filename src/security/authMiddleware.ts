import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import {UserAuthRequest} from '../definitions/userAuthRequest';
import {Response, NextFunction} from 'express';

const auth = async (req: UserAuthRequest,
    res: Response,
    next: NextFunction) => {
  // Get refresh token
  const authCookie = req.headers['cookie'];

  let authHeader = '';
  if (authCookie) {
    authHeader = authCookie.split('=')[1];
  }

  const refreshToken = req.body.token ||
        req.query.token ||
        authHeader;

  // If ADMIN_PRIVATE_KEY is used and matches secret allow call to go forward
  if (req.body.privateKey &&
        process.env.ADMIN_PRIVATE_KEY === req.body.privateKey) {
    return next();
  }

  if (refreshToken == null) {
    return res.status(400).json({
      error: true,
      message: 'no token sent',
    });
  }


  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string,
      async (err: any, token: any) => {
        if (err) {
          console.log(err);
          return res.status(401).json({
            error: true,
            message: 'invalid refresh token',
          });
        }

        // If the refresh token is verified it will contain the authToken
        if (!token.id) {
          return res.status(400).json({
            error: true,
            message: 'No ID present in token',
          });
        }

        // Verify the authToken
        jwt.verify(token.id as string,
                   process.env.ACCESS_TOKEN_SECRET as string,
                   (err: any, id: any) => {
                     if (err) {
                       console.log(err);
                       return res.status(401).json({
                         error: true,
                         message: 'invalid auth token',
                       });
                     }

                     req.user = id;

                     next();
                   });
      });
};

module.exports=auth;
