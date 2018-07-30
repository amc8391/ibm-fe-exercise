import React, { Component } from 'react';
import { getCompanyCostsById } from '../ApiConnector';

class CompanyCostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCompanyCost: 0,
    }
  }

  onCompanyChange(e) {
    const companyId = e.target.value;
    getCompanyCostsById(companyId)
    .then(response => {
      this.setState({
        selectedCompanyCost: response.totalCosts
      })
    })
  }

  render() {
    return (
      <div className="row">
        <div className="CompanyCostForm col">
          <h3>Current Costs to Companies</h3>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Company Name</label>
            <select className="col-sm-9 custom-select" ref="selectedCompany" defaultValue="" onChange={this.onCompanyChange.bind(this)} >
              <option value="" disabled>Select your company</option>
              {this.props.companyList.map(company => 
                <option value={company.id} key={company.id} >{company.name}</option>
              )}
            </select>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Total Costs</label>
            <div>{this.state.selectedCompanyCost.toLocaleString('en-US', {currency: 'USD', style: 'currency'})}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyCostForm;
