import express from 'express';

export interface Request extends express.Response {
  user: any
};
