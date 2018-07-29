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
                      .filter(salary => salary > 0)
                      .reduce((salary, total) => total + salary, 0);
      cb(null, totalCosts);
    });
  };
};
