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

exports.getMyAds = (req, res) => {
  res.render('account/myads', {
    title: 'My Ads'
  });
};

const query = Ad.find();
query.exec((err, ads) => {
  if (err) { throw err; }
  let ad;
  for (let i = 0, l = ads.length; i < l; i++) {
    ad = ads[i];
    console.log(ad);
  }
});

