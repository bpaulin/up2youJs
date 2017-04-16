var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('login', function() {

  describe('GET /login', function() {

    it('should return a token', function(done) {

      request(server)
        .post('/login')
        .send({ role: 'admin' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.have.keys('token');
          done();
        });
    });

  });

});
