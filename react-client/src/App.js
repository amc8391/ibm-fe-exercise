import React, { Component } from 'react';
import NewEmployeeForm from './components/NewEmployeeForm';
import CompanyCostForm from './components/CompanyCostForm';
import { getCompanyList } from './ApiConnector';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: []
    }
  }

  componentWillMount() {
    this.refreshCompanyList();
  }

  refreshCompanyList() {
    getCompanyList().then(newCompanyList => {
      this.setState({ companyList: newCompanyList });
    });
  }

  render() {
    getCompanyList()
    return (
      <div className="container">
        <h2>Employee Information</h2>
        <NewEmployeeForm companyList={this.state.companyList} onSubmitCb={this.refreshCompanyList.bind(this)} />
        <CompanyCostForm companyList={this.state.companyList} />
      </div>
    );
  }
}

export default App;
