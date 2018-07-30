'use strict';
var app = require('../server/server');
var assert = require('assert');
var utils = require('./utils');

describe('REST API request', function() {
  before(utils.beforeHandler);
  after(utils.afterHandler);

  it('should not allow users to list all employees', function(done) {
    utils.json('get', '/api/employees')
      .expect(404, function(err, res) {
        done();
      });
  });
});
