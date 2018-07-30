'use strict';
var app = require('../server/server');
var assert = require('assert');
var utils = require('./utils');
var company = require('../common/models/company');

describe('REST API request', function() {
  before(utils.beforeHandler);
  after(utils.afterHandler);
  it('should return a list of all companies', function(done) {
    utils.json('get', '/api/companies')
      .expect(200, function(err, res) {
        assert(Array.isArray(res.body));
        // Not sure how to mock out the data source to get a repeatable result here
        // assert.equal(res.body.length, 7);
        done();
      });
  });
});

describe('Company model', function() {
  it('should provide the company\'s total costs', function(done) {
    done()
    // Not sure how to mock out the data source to get a repeatable result here
  });
});
