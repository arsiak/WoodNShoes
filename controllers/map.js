const Ad = require('../models/Ad');


exports.map = (req, res) => {
    res.render('account/map', {title : 'map'});
};

exports.getAll = (req, res) => {
   Ad.find((err, docs) => {
      res.render('account/map', {title : 'Map',"ads": docs});
    }).sort({'createdAt': -1});
};


// const Event = require('../models/Event');
//
//
// exports.getAll = (req, res) => {
//   Event.find((err, docs) => {
//     res.render('account/map', {title : 'Map',"events": docs});
//   });
// };