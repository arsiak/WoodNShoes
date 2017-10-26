const Shoes = require('../models/Shoes');

exports.postShoes = (req, res) => {
  const shoe = new Shoes({
    id: req.body.id,
    brand: req.body.brand,
    size: req.body.size,
    price: req.body.price

  });
  shoe.save(() => {
    res.redirect('/bidule');
  });
};

exports.index = (req, res) => {
  res.render('Shoes', {
    title: 'Shoes'
  });
};

