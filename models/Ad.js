const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  shoesBrand: String,
  shoesColor: String,
  shoesRates: Number,
  shoesDate: Date,
  shoesLocation: String,
  shoesGender: String,
  shoesPrice: Number,
  shoesSize : String,  
}, { timestamps: true });


const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
