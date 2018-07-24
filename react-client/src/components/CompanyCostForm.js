import React, { Component } from 'react';

class CompanyCostForm extends Component {
  companyList = [
    {
      companyId: '5b56ebb2ede9c21cd01b16c6',
      name: 'IBM'
    }
  ];

  cost = 300;

  render() {
    return (
      <div className="row">
        <div className="CompanyCostForm col">
          <h3>Current Costs to Companies</h3>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Company Name</label>
            <select className="col-sm-9 custom-select" >
              {this.companyList.map(company => 
                <option value={company.companyId}>{company.name}</option>
              )}
            </select>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Total Costs</label>
            <div>{this.cost.toLocaleString('en-US', {currency: 'USD', style: 'currency'})}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyCostForm;
