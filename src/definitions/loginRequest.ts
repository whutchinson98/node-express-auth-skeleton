import {Request} from 'express';

export interface LoginRequest extends Request {
  body: {
    user: string,
    password: string
  }
};
