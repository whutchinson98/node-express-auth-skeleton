import {Router} from 'express';

/* eslint-disable-next-line new-cap */
const router = Router();

const {createUser,
  editUser,
  deleteUser} = require('../controllers/userController');

// ROUTES
router.post('/create', createUser);
router.put('/edit', editUser);
router.put('/remove', deleteUser);

module.exports = router;
