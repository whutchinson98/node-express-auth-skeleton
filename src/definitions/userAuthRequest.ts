import {Request} from 'express';

export interface UserAuthRequest extends Request {
  user: string,
  refreshToken: string,
};
