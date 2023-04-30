const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const indexRouter = require('./routes/v1/index');
const usersRouter = require('./routes/v1/users-routes');
const productsRouter = require('./routes/v1/products-routes');
// Exportacion global de la funcion info: var log = require('./modules/my-log');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api/v1/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productsRouter);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('Connected to mongodb');
    app.listen(PORT, () => {
      console.log(`running on ${PORT}`);
    });
  })
  .catch(error => {
    console.log('mongo error', error);
  });