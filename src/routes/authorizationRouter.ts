
import express from 'express';

/* eslint-disable-next-line new-cap*/
const router = express.Router();

const {login, logout} = require('../controllers/authorizationController');

// ROUTES
router.put('/login', login);
router.get('/logout', logout);

module.exports = router;
