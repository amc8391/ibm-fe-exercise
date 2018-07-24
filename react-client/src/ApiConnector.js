const API_BASE = 'http://localhost:3001/api/';

export function createNewEmployee(employee) {
  return fetch(`${API_BASE}employees`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(employee)
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
