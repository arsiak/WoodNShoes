const Ad = require('../models/Ad');

exports.postAd = (req, res, next) => {
  console.log('test');
  const ad = new Ad({
    description: req.body.descr,
    title: req.body.title,
    shoes: {
      brand: req.body.brand,
      color: req.body.color,
      location: req.body.location,
      gender: req.body.gender,
      price: req.body.price,
      size: req.body.size,
    },
    user: req.body.user
  });


  ad.save((err) => {
    if (err) { return next(err); }
    req.flash('success', { msg: 'Success! You just add an advert !!' });
    res.redirect('/account');
  });
};

exports.render = (req, res) => {
  res.render('account/add', {
    title: 'Add'
  });
};
