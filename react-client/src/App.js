import React, { Component } from 'react';
import NewEmployeeForm from './components/NewEmployeeForm';
import CompanyCostForm from './components/CompanyCostForm';
import { getCompanyList } from './ApiConnector';


class App extends Component {
  render() {
    getCompanyList()
    return (
      <div className="container">
        <h2>Employee Information</h2>
        <NewEmployeeForm />
        <CompanyCostForm />
      </div>
    );
  }
}

export default App;
