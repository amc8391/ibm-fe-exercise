import React, { Component } from 'react';
import { fields } from '../models/User';
import { createNewEmployee, findOneCompanyByName, createCompany } from '../ApiConnector';

class NewEmployeeForm extends Component {
  submitNewEmployee(newEmployee) {
    createNewEmployee(newEmployee);
  }

  onSubmit(e) {
    e.preventDefault();

    const companyName = this.refs.companyName.value;
    let newEmployee = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      address: this.refs.address.value,
      salary: this.refs.salary.value,
      companyName: companyName,
    }

    findOneCompanyByName(companyName)
    .then(res => {
      if (res.error) {
        return createCompany({name: companyName})
        .then(company => {
          newEmployee.companyId = company.id;
          return createNewEmployee(newEmployee);
        })
      } else {
        newEmployee.companyId = res.id;
        return createNewEmployee(newEmployee);
      }
    })
    .then(emp => {
      this.populateFeedback(emp);
      this.clearForm();
      // Update company list
    });
  }

  populateFeedback(returnedEmployee) {
    this.refs.returnedfirstName.value = returnedEmployee.firstName;
    this.refs.returnedlastName.value = returnedEmployee.lastName;
    this.refs.returnedaddress.value = returnedEmployee.address;
    this.refs.returnedsalary.value = returnedEmployee.salary;
    this.refs.returnedcompanyName.value = returnedEmployee.companyName;
  }

  clearForm() {
    this.refs.firstName.value = '';
    this.refs.lastName.value = '';
    this.refs.address.value = '';
    this.refs.salary.value = '';
    this.refs.companyName.value = '';
  }

  render() {
    return (
      <div className="row">
        <form className="EmployeeForm col-sm-6 col-md-5" onSubmit={this.onSubmit.bind(this)}>
          <h3>Create a New Employee</h3>
          {/* List each field */}
          {fields.map(userField =>
            <div className="form-group row" key={userField.id}>
              <label className="col-sm-3 col-form-label" htmlFor={userField.id}>
                {userField.label}:
              </label>
              <input className="form-control col-sm-9" ref={userField.id} name={userField.id} type={userField.type ? userField.type : 'text'}/>
            </div>
          )}
          
          {/* Submit button */}
          <div className="form-group row">
            <input type="submit" value="Add a New Employee" className="btn col" />
          </div>
        </form>

        <div className="spacer col-md-2"></div>
        
        {/* Newly created employee */}
        <div className="EmployeeView col-sm-6 col-md-5">
          <h3>Creation Results</h3>        
          {fields.map(userField =>
            <div className="form-group row" key={'returned' + userField.id}>
              <label className="col-sm-3 col-form-label" htmlFor={userField.id}>
                {userField.label}:
              </label>
              <input className="form-control col-sm-9" ref={'returned' + userField.id} name={userField.id} disabled />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default NewEmployeeForm;
