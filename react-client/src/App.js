import React, { Component } from 'react';
import './App.css';
import NewEmployeeForm from './components/NewEmployeeForm';
import CompanyCostForm from './components/CompanyCostForm';

class App extends Component {
  render() {
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
