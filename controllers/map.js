const Ad = require('../models/Ad');


exports.map = (req, res) => {
    res.render('account/map', {title : 'map'});
};

exports.getAll = (req, res) => {
   Ad.find((err, docs) => {
      res.render('account/map', {title : 'Home',"ads": docs});
    }).sort({'createdAt': -1});
};