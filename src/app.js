'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var cors = require('cors');
var jwt = require('jsonwebtoken');
var _ = require('underscore');
var parameters = require('./parameters');

app.use(cors());
module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    APIKey: function(req, def, JWTAuth, callback) {
      var current_req_roles = req.swagger.operation["x-security-roles"];
      if (!!JWTAuth && JWTAuth.indexOf("Bearer ") == 0) {
        var JWTToken = JWTAuth.split("Bearer ")[1];
        jwt.verify(JWTToken, parameters.jwt_secret, function(err, payload) {
          if (err) {
            var err = new Error('Invalid token');
            err['statusCode'] = 401;
            callback(err);
            return
          }
          if (_.intersection(payload.roles, current_req_roles).length == 0) {
            var err = new Error('Not Authorized');
            err['statusCode'] = 403;
            callback(err);
          }
          else {
            req.swagger.params.auth_payload = payload;    //example
            callback()
          }
        });
      } else {
        var err = new Error('Failed to authenticate using bearer token');
        err['statusCode'] = 401; // custom error code
        callback(err);
      }
    }
  }
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
