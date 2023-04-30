const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../../mongo/models/users');
const products = require('../../mongo/models/products');

const expiresIn = 60 * 20;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ email });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        const token = jwt.sign(
          { userId: user._id, username: user.username, cupon: user.cupon },
          process.env.JWT_SECRET,
          { expiresIn }
        );
        res.send({ status: 'OK', data: { token, expiresIn } });
      } else {
        res.status(403).send({ status: 'INVALID_PASSWORD', message: '' });
      }
    } else {
      res.status(401).send({ status: 'USER_NOT_FOUND', message: '' });
    }
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const hash = await bcrypt.hash(password, 15);

    await users.create({
      username,
      email,
      password: hash,
    });

    res.send({ status: 'ok', message: 'Usuario creado' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'Duplicated_values', message: error.keyValue });
      return;
    }
    res.status(505).send({ status: 'Error', message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error('missing param userId');
    }
    await users.findByIdAndDelete(userId);
    res.send({ status: 'ok', message: 'user delete' });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};
const getAllUser = async (req, res) => {
  try {
    const user = await users
      .findById(req.sessionData.userId)
      .select({ data: 0, __v: 0, role: 0 });
    res.send({ status: 'ok', data: user });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const updateCupon = async (req, res) => {
  try {
    const { cupon } = req.body;
    console.log('LLega', cupon);
    const cupon1 = await users
      .findById(req.sessionData.userId)
      .select({ cupon: 1 });
    console.log('cUPON FIND', cupon1);
    if (cupon1.cupon === '' && cupon !== cupon1.cupon && cupon !== null) {
      await users.findByIdAndUpdate(req.sessionData.userId, {
        cupon
      });
      console.log('actualizado');
      res.status(200).send({ status: 'OK', message: 'cupon actualizado' });
    } else {
      res.status(200).send({ status: 'YA', message: 'sin utilizar' });
      console.log('NO actualizado');
    }
  } catch (error) {
    console.log('Error updateCupon', error.message);
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: 'not updated' });
    }
    res.status(500).send({ status: 'ERROR', message: 'not updated' });
  }
};

const validateCupon = async (req, res) => {
  try {
    console.log('req.sessionData', req.sessionData);
    const { cupon } = req.body;
    const cupon1 = await users
      .findById(req.sessionData.userId)
      .select({ cupon: 1 });
    if (cupon === cupon1.cupon) {
      console.log('SIII');
      await users.findByIdAndUpdate(req.sessionData.userId, {
        cupon: ''
      });
      res.status(200).send({ status: 'OK', message: 'cupon actualizado' });
    } else {
      res.status(500).send({ status: 'NO', message: 'no es igual' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ status: 'ERROR', message: 'not updated' });
  }
};

module.exports = {
  createUser,
  deleteUser,
  getAllUser,
  updateCupon,
  validateCupon,
  login,
};
