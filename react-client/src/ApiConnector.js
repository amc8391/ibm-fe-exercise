const API_BASE = 'http://localhost:3001/api/';

export function createEmployee(employee) {
  return fetch(`${API_BASE}employees`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(employee)
  })
  .then(res => res.json());
}

export function findOneCompanyByName(companyName) {
  return fetch(`${API_BASE}companies/findOne?filter[where][name]=${companyName}`)
  .then(res => res.json());
}

export function findOrCreateCompany(companyName) {
  // Check to see if the company exists
  return findOneCompanyByName(companyName)
  .then(res => {
    if (!res.error) {
      return res;
    } else {
      // if the company hasn't been created, make it
      if (res.error.statusCode === 404){
        return createCompany({name: companyName})
      } else {
        throw res.error; 
      }
    }
  })
}

export function createCompany(company) {
  return fetch(`${API_BASE}companies`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(company)
  })
  .then(res => res.json());
}

export function getCompanyList() {
  return fetch(`${API_BASE}companies`)
  .then(res => res.json());
}

export function getCompanyCostsById(id) {
  return fetch(`${API_BASE}companies/${id}/costs`)
  .then(res => res.json());
}
