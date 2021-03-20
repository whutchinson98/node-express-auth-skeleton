
import express from 'express';

/* eslint-disable-next-line new-cap*/
const router = express.Router();

import {login} from '../controllers/authorizationController';

// ROUTES
router.put('/login', login);

module.exports = router;
