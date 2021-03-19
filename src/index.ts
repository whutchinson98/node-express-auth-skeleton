'use strict';

import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');
import JwtManager from './security/jwtManager';
import {refreshToken} from './security/generateJWT';
require('dotenv').config();

// CONSTANTS
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

// JWT Manager
const tokenManager = new JwtManager();

// DATABASE CONNECTION


// APP
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

// ROUTES
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Well done!');
});

app.post('/token', (req: express.Request, res: express.Response) => {
  const oldToken = req.body.refreshToken;
  const id = req.body.id;

  refreshToken(tokenManager, oldToken, id);
});

app.listen(PORT, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
