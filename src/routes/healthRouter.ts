import {Router} from 'express';

/* eslint-disable-next-line new-cap */
const router = Router();

const {connections, misc} = require('../controllers/healthController');

// ROUTES
router.get('/misc', misc);
router.get('/connections', connections);

module.exports = router;
