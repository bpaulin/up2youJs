'use strict';

var util = require('util');

module.exports = {
  admin: admin
};

function admin(req, res) {
  res.json("hello");
}
