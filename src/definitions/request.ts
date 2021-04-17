import express from 'express';

export interface Request extends express.Request {
  user: any,
  body: any,
  refreshToken: string,
};
