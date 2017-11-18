const mongoose = require('mongoose');

const ShoeSchema = new mongoose.Schema({
    id: { type: Number, Unique: true },
    brand: String,
    Size: Number,
    Price: Number
}, { timestamps: true });

const Shoes = mongoose.model('Shoes', ShoeSchema);

module.exports = Shoes;
