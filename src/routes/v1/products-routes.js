const express = require('express');
const cors = require('cors');

const router = new express.Router();
const productsController = require('../../controllers/v1/products-controller');

router.use(cors());

router.post('/create', productsController.createProduct);
router.get('/get-all', productsController.getProduct);
router.get('/get-by-user/:userid', productsController.getProductByUser);

module.exports = router;
