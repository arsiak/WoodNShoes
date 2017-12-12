const Event = require('../models/Event');
const http = require('http');

exports.getAll = (req, res) => {
  Event.find((err, docs) => {
    let velibs = '';
    let data = http.get('http://www.velostanlib.fr/service/carto', (resp) => {
      let data = '';
      resp.on('data', (chunk)=>{
        velibs +=chunk;
      });
      resp.on('end',()=>{
        res.render('account/map', {title : 'Events',"events": docs, "velibs" : velibs });
      })
    });
  });
};