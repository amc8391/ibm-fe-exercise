import React, { Component } from 'react';
import { fields } from '../models/User';
import { createEmployee, findOrCreateCompany } from '../ApiConnector';

class NewEmployeeForm extends Component {

  /**
   * Given an error with a message attribute, prints this message to the user with the populateFeedback method 
   * @param {Object} err - An error
   */
  handleError(err) {
    this.populateFeedback({
      firstName: 'Error!',
      lastName: 'Message: ' + err.message,
      address: '',
      companyName: '',
      salary: ''
    });
  }

  /**
   * An event handler invoked when the user submits the new employee form
   * Creates a new employee
   * @param {Event} e - The submission event triggering the employee submission
   */
  onSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      this.handleError({message: 'Please fill out the form'});
    } else {
      const companyName = this.refs.companyName.value;
      let newEmployee = {
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        address: this.refs.address.value,
        salary: this.refs.salary.value,
        companyName: companyName,
      }

      findOrCreateCompany(companyName)
      .then(company => {
        newEmployee.companyId = company.id;
        return createEmployee(newEmployee);
      })
      .then(emp => {
        if (emp.error) {
          throw emp.error
        }
        this.populateFeedback(emp);
        this.clearForm();
        this.props.onSubmitCb();
      })
      .catch(this.handleError.bind(this))
    }
  }


  /**
   * Iterates through all the known fields in the Employee form and determines whether the form is valid
   */
  validateForm() {
    for (var i = 0; i < fields.length; i ++) {
      if (fields[i].required && !this.refs[fields[i].id].value) {
        return false;
      }
    }
    return true;
  }

  /**
   * Populates the disabled field to get feedback to the user about their new employee submission
   * @param {Object} returnedEmployee - The newly processed employee
   */
  populateFeedback(returnedEmployee) {
    for (var i = 0; i < fields.length; i ++) {
      this.refs['returned' + fields[i].id].value = returnedEmployee[fields[i].id];
    }
  }

  /**
   * Sets all the values in the employee form to ''
   */
  clearForm() {
    for (var i = 0; i < fields.length; i ++) {
      this.refs[fields[i].id].value = '';
    }
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
