import {Router} from 'express';

/* eslint-disable-next-line new-cap */
const router = Router();

const {logout} = require('../controllers/authorizationController');

// ROUTES
router.get('/logout', logout);

module.exports = router;
