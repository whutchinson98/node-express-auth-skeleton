import {Router} from 'express';

/* eslint-disable-next-line new-cap */
const router = Router();

const {login, logout} = require('../controllers/authorizationController');

// ROUTES
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
