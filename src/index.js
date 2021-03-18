'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
require('dotenv').config();
// CONSTANTS
var PORT = process.env.PORT || 8080;
var HOST = process.env.HOST || '0.0.0.0';
// DATABASE CONNECTION
// APP
var app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
// ROUTES
app.get('/', function (req, res) {
    res.send('Well done!');
});
app.listen(PORT, function () {
    console.log("Running on http://" + HOST + ":" + PORT);
});
