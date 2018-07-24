'use strict';

module.exports = function(Company) {
  /**
   * Calculate the costs of the company (including the salary of its employees)
   * @param {Function(Error, number)} callback
   */
  Company.prototype.cost = function(cb) {
    let filter = {};
    this.employees(filter, (err, employeeResults) => {
      if (err) return cb(err);
      let totalCosts = employeeResults
                      .map(emp => emp.salary)
                      .reduce((salary, total) => total + salary);
      cb(null, totalCosts);
    });
  };
};
