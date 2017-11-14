const Ad = require('../models/Ad');

exports.index = (req, res) => {
  if(!req.query.gender && !req.query.fast_search){
    Ad.find((err, docs) => {
      res.render('home', {title : 'Home',ads: docs});
    }).sort({'createdAt': -1});
  }else if(!req.query.fast_search){
    let query = Ad.find((err,docs)=>{});

    if(req.query.gender !== "other")
      query.where('shoes.gender', req.query.gender);

    if(req.query.brand !== ""){
      query = query.where('shoes.brand', req.query.brand.toUpperCase());
    }
    if(req.query.budget !== ""){
      query = query.where({'shoes.price' :{ $lte : req.query.budget - 10 }});
    }
    if(req.query.size !== ""){
      query = query.where('shoes.size', '' + req.query.size);
    }

    query = query.sort({'createdAt': -1});
    query.exec((err, docs) => {
      res.render('home', {title : 'Home',ads: docs});
    });
  }else{
    let query = Ad.find((err,docs)=>{});
    if(req.query.fast_search !== ""){
      let regex = new RegExp(".*"+req.query.fast_search+".*", "i");
      query.where({$or : [{'title' : {$regex : regex}}, {'description' :{$regex : regex}}]}  );
    }

    query = query.sort({'createdAt': -1});
    query.exec((err, docs) => {
      res.render('home', {title : 'Home',ads: docs});
    });
  }
};






