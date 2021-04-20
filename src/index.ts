'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as logger from './utils/logger';
require('dotenv').config();

logger.initLogger(process.env.LOG_LEVEL || 'debug');

// DATABASE CONNECTION
const mongoURL = process.env.NODE_ENV === 'test' ?
  (global as any).__MONGO_URI__ : process.env.DB_URL;

mongoose.connect(mongoURL,
    {useNewUrlParser: true, useUnifiedTopology: false})
    .catch((err) => {
      logger.logError(err);
    });

const db = mongoose.connection;
db.once('open', () => logger.logInfo('Database Connected'));
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// APP
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

// ROUTES

/* Health Check */
app.use('/health', require('./routes/healthRouter'));

/* Login, Logout */
app.use('/auth', require('./routes/authorizationRouter'));

// AUTHENTICATED ROUTES

app.use(require('./security/authMiddleware'));

/* RefreshToken */
app.use('/auth', require('./routes/refreshRouter'));
app.use('/auth', require('./routes/logoutRouter'));

app.use('/admin', require('./routes/adminRouter'));

export = app;
