const Ad = require('../models/Ad');

exports.index = (req, res) => {


  let num = Ad.count({},(err, count) => {
    num = count;
    if(num%10 !==0)
      num = Math.trunc(num*0.1)+1 ;
    else
      num = num*0.1;
  });

  let current = parseInt(req.query.page);

  if(req.query.page === '' || !req.query.page)
    current = 1;

  if(!req.query.gender && !req.query.fast_search)
  {
    if(!req.query.page || req.query.page ===1){
      Ad.find((err, docs) => {
        res.render('home', {title : 'Home',ads: docs, url: req.path, pages: num, current_page : current});
      }).sort({'createdAt': -1}).limit(11);

    }else{
      Ad.find((err, docs) => {
        res.render('home', {title : 'Home',ads: docs, url: req.path , pages: num, current_page : current});
      }).sort({'createdAt': -1}).skip(10*req.query.page-9).limit(10);
    }

  }
  else
  if(!req.query.fast_search)
  {

    let query = Ad.find((err,docs)=>{});

    if(req.query.gender !== "other")
      query.where('shoes.gender', req.query.gender);

    if(req.query.brand !== ""){
      query = query.where('shoes.brand', req.query.brand.toUpperCase());
    }
    if(req.query.budget !== ""){
      query = query.where({'shoes.price' :{ $lte : req.query.budget }});
    }
    if(req.query.size !== ""){
      query = query.where('shoes.size', '' + req.query.size);
    }

    query = query.sort({'createdAt': -1});

    query.exec((err, docs) => {

      res.render('home', {title : 'Home',ads: docs});
    });
  }
  else
  {
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






