const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');



const adSchema = new mongoose.Schema({
  description: String,
  title: String,
  shoes: {
    brand: String,
    color: String,
    location: String,
    gender: String,
    price: Number,
    size: String,
    picture : String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reserved : Boolean
}, { timestamps: true });


const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
