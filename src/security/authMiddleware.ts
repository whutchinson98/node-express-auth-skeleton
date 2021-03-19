import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = async (req: Express.Request, res: Express.Response, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (process.env.ADMIN_PRIVATE_KEY === req.body.privateKey) {
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

module.exports.auth = auth;
