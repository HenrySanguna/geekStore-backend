const express = require('express');
const cors = require('cors');
const router = express.Router();
const products = require('../../controllers/v1/products-controller');
const users = require('../../controllers/v1/users-controller');

router.use(cors());

// router.use('/api/v1/users', usersRoutes);
// router.use('/api/v1/products', productsRoutes);

module.exports = router;
