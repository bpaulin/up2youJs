'use strict';

var util = require('util');
var jwt = require('jsonwebtoken');
var parameters = require('../../parameters');

module.exports = {
  login: login
};

function login(req, res) {
  var token = jwt.sign(
    { roles: [req.swagger.params.credentials.value.role] },
    parameters.jwt_secret
  );

  res.json({"token":token});
}
