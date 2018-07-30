'use strict';
var request = require('supertest');
var app = require('../server/server');

function json(verb, url) {
  return request(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
}

function beforeHandler(done) {
  require('./start-server');
  done();
}

function afterHandler(done) {
  app.removeAllListeners('started');
  app.removeAllListeners('loaded');
  done();
}

module.exports = {
  json,
  beforeHandler,
  afterHandler,
};
