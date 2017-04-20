'use strict';

var util = require('util');
var Proposition     = require('../models/proposition');

module.exports = {
  add: add
};

function add(req, res) {
  if (0 === Proposition.collection.conn.readyState) {
    return res.status(500).json({message:"Unable to connect to mongo"});
  }
  Proposition.update(
    {
      name: req.swagger.params.body.value.name,
      sex: req.swagger.params.body.value.sex
    },
    {
      $set: {lastSent: new Date()},
      $inc: {count:1}
    },
    {
      upsert: true
    },
    function (err, raw) {
      console.log(err);
      console.log(raw);
      if (err) {
        res.sendStatus(500);
      }
      console.log('The raw response from Mongo was ', raw);
    }
  );
  res.json(req.swagger.params.body.value.name);
}
