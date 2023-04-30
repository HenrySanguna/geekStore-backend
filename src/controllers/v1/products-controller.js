const Products = require('../../mongo/models/products');

const createProduct = async (req, res) => {
  try {
    const { title, descr, price, images, type, userId } = req.body;

    const product = await Products.create({
      title, descr, price, images, type, user: userId
    });
    res.send({ status: 'OK', data: product });
  } catch (e) {
    console.log('createProduct error:', e);
    res.status(500).send({ status: 'Error', data: e.message });
  }
};
const deleteProduct = (req, res) => {};

const getProduct = async (req, res) => {
  try {
    const products = await Products.find({}).select('title descr price type images').populate('user', 'username email data role');
    res.send({ status: 'OK', data: products });
  } catch (e) {
    console.log('GetProduct error:', e);
    res.status(500).send({ status: 'Error', data: e.message });
  }
};

const getProductByUser = async (req, res) => {
  try {
    const products = await Products.find({
      user: req.params.userid
    });
    res.send({ status: 'OK', data: products });
  } catch (e) {
    console.log('GetUserProduct error:', e);
    res.status(500).send({ status: 'Error', data: e.message });
  }
};

module.exports = { createProduct, deleteProduct, getProduct, getProductByUser };