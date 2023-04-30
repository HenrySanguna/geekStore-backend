const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  descr: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [{ type: String, required: true }], default: [] },
  type: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
{
  timestamps: true
});

const model = mongoose.model('Product', productSchema);

module.exports = model;
