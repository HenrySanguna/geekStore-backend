const express = require('express');
const cors = require('cors');
const { isAuth, isAdmin } = require('../../middlewares/auth');
const usersController = require('../../controllers/v1/users-controller');

const router = express.Router();
require('dotenv').config();

router.use(cors());

router.post('/create', usersController.createUser);
router.post('/delete', isAuth, isAdmin, usersController.deleteUser);
router.post('/update', isAuth, usersController.updateCupon);
router.post('/validate', isAuth, usersController.validateCupon);
router.post('/get-all', isAuth, usersController.getAllUser);
router.post('/login', usersController.login);

module.exports = router;
