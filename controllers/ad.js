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
      size: req.body.size
    },
    user: req.user
  });


  ad.save((err) => {
    if (err) { return next(err); }
    req.flash('success', { msg: 'Success! You just add an ad !' });
    res.redirect('/account');
  });
};

exports.render = (req, res) => {
  res.render('account/add', {
    title: 'Add'
  });
};

exports.getMyAds = (req, res) => {
  Ad.find((err, docs) => {
    res.render('account/myads', {title: 'My ads', ads: docs});
  }).where("user",req.user).sort({'createdAt': -1});
};

exports.postDeleteAd = (req, res) => {
  Ad.remove({_id: req.param('id')}, function(err,removed) {
    if(err)
      return next(err);
  });
  req.flash('success',{msg : 'Your ad has been deleted'})
  res.redirect('/account/myads');
};

exports.postUpdateAd = (req, res) => {
  Ad.findById(req.param('id'), (err, ad) => {
    if (err) { return next(err); }
    ad.title = req.body.title || '';
    ad.description = req.body.description || '';
    ad.shoes.gender = req.body.gender || '';
    ad.shoes.price = req.body.price || '';
    ad.shoes.brand = req.body.brand || '';
    ad.shoes.size = req.body.size || '';
    ad.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
          return res.redirect('/account');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Your ad has been updated.' });
      res.redirect('/account/myads');
    });
  });
};