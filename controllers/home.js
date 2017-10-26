const Ad = require('../models/Ad');

exports.index = (req, res) => {
  Ad.find((err, docs) => {
    res.render('home', {title : 'Home',ads: docs});
  }).sort({'createdAt': -1});
};



