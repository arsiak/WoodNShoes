const Ad = require('../models/Ad');
const User = require('../models/User');


exports.postAd = (req, res, next) => {
  const ad = new Ad({
    description: req.body.descr,
    title: req.body.title.toUpperCase(),
    shoes: {
      brand: req.body.brand.toUpperCase(),
      location: req.body.user_input_autocomplete_address,
      gender: req.body.gender,
      price: req.body.price,
      size: req.body.size,

    },
    user: req.user,
    reserved : false
  });

  if (req.file)
    ad.shoes.picture = req.file.filename;

  ad.save((err) => {
    if (err) { return next(err); }
    req.flash('success', { msg: 'Success! You just add an ad !' });
    res.redirect('/');
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


exports.postReserveAd = (req, res) => {
  Ad.findById(req.param('id'), (err, ad) => {
    if (err) { return next(err); }
    ad.reserved = !ad.reserved;
    ad.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
          return res.redirect('/account');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Your ad has been reserved.' });
      res.redirect('/account/myads');
    });
  });
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

exports.getAdInfo = (req, res) =>{
  Ad.findById(req.param('id')).populate('user').exec((err, docs) =>{
    res.render('adInfo', {title: 'Ad', ad: docs});
  })
};