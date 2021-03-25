'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
require('dotenv').config();
const globalAny:any = global;

// DATABASE CONNECTION

const mongoURL = process.env.NODE_ENV === 'test' ?
  globalAny.__MONGO_URI__ : process.env.DB_URL;

mongoose.connect(mongoURL,
    {useNewUrlParser: true, useUnifiedTopology: false})
    .catch((err) => {
      console.log(err);
    });

const db = mongoose.connection;
db.once('open', () => console.log('Connected to mongo database'));
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// APP
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

// ROUTES

/* Health Check */
app.get('/health', (req: express.Request, res: express.Response) => {
  res.send('Well done!');
});

/* Login, Logout */
app.use('/', require('./routes/authorizationRouter'));

// AUTHENTICATED ROUTES
app.use(require('./security/authMiddleware'));

/* RefreshToken */
app.use('/', require('./routes/refreshRouter'));


module.exports = app;
