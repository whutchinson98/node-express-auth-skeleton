import {Response, Request} from 'express';
import mongoose from 'mongoose';

const mongooseConnectionStates = ['DISCONNECTED',
  'CONNECTED',
  'CONNECTING',
  'DISCONNECTING',
];

const connections = async (req: Request, res: Response) => {
  try {
    const state = mongooseConnectionStates[mongoose.connection.readyState];
    return res.status(200).json({
      error: false,
      mongoose: state,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: 'Error occured fetching connection state.',
    });
  }
};

const misc = async (req: Request, res: Response) => {
  return res.status(200).json({
    error: false,
    message: 'Healthy',
  });
};

module.exports = {
  connections,
  misc,
};
