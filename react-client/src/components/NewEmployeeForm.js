import React, { Component } from 'react';
import { fields } from '../models/User';

class NewEmployeeForm extends Component {
  render() {
    return (
      <div className="row">
        <div className="EmployeeForm col-sm-6 col-md-5">
          <h3>Create a New Employee</h3>
          {/* List each field */}
          {fields.map(userField =>
            <div className="form-group row" key={userField.id}>
              <label className="col-sm-3 col-form-label" htmlFor={userField.id}>
                {userField.label}:
              </label>
              <input className="form-control col-sm-9" id={userField.id} name={userField.id}/>
            </div>
          )}
          
          {/* Submit button */}
          <div className="form-group row">
            <button type="submit" className="btn col">Add a New Employee</button>
          </div>
        </div>

        <div className="spacer col-md-2"></div>
        
        <div className="EmployeeView col-sm-6 col-md-5">
          <h3>Creation Results</h3>        
          {fields.map(userField =>
            <div className="form-group row" key={userField.id}>
              <label className="col-sm-3 col-form-label" htmlFor={userField.id}>
                {userField.label}:
              </label>
              <input className="form-control col-sm-9" id={userField.id} name={userField.id} disabled />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default NewEmployeeForm;
