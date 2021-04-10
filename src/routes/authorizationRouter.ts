import {Router} from 'express';

/* eslint-disable-next-line new-cap */
const router = Router();

const {login} = require('../controllers/authorizationController');

// ROUTES
router.post('/login', login);

module.exports = router;
