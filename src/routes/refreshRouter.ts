import {Router} from 'express';

/* eslint-disable-next-line new-cap */
const router = Router();

const {refreshToken} = require('../controllers/authorizationController');

// ROUTES
router.put('/refreshtoken', refreshToken);

module.exports = router;
