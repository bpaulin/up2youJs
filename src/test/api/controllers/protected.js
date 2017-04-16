var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function () {

    describe('protected', function () {

        describe('GET /protected/admin', function () {

            it('should return be forbidden without token', function (done) {
                request(server)
                    .get('/protected/admin')
                    .expect(401)
                    .end(function (err, res) {
                        should.not.exist(err);
                        done();
                    });
            });

            describe('authorized access', function () {
                var token = null;

                before(function (done) {
                    request(server)
                        .post('/login')
                        .send({role: 'admin'})
                        .end(function (err, res) {
                            token = res.body.token;
                            done();
                        });
                });

                it('should return authorized with token', function (done) {
                    request(server)
                        .get('/protected/admin')
                        .set('Authorization', 'Bearer ' + token)
                        .expect(200)
                        .end(function (err, res) {
                            should.not.exist(err);
                            done();
                        });
                });

            });

        });

    });

});
