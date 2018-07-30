const API_BASE = '/api/';

/**
 * Given a valid employee object, sends a POST request to the REST API and persists an employee
 * @param {Object} employee - An employee object
 * @returns {Promise} - The newly created employee
 */
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

/**
 * Given the name of a company, queries the REST server and returns a company object
 * @param {string} companyName - The name of the queried company
 * @returns {Promise} - A company object matching the companyName queried
 */
export function findOneCompanyByName(companyName) {
  return fetch(`${API_BASE}companies/findOne?filter[where][name]=${companyName}`)
  .then(res => res.json());
}

/**
 * Checks to see if a company exists by its name. If the company does not, creates a new company. Returns a company object either way.
 * @param {string} companyName - The name of the queried company
 * @returns {Promise} - A new or previously existing company object
 */
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
  /**
   * Creates a company on the REST service given a company object with a 'name' attribute
   * @returns {Promise} - The newly created company object
   */
  return fetch(`${API_BASE}companies`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(company)
  })
  .then(res => res.json());
}

/**
 * Lists all companies accessible on the REST service
 * @returns {Promise} - A list of company objects
 */
export function getCompanyList() {
  return fetch(`${API_BASE}companies`)
  .then(res => res.json());
}

/**
 * Looks up a company and returns to the user how much the company spends annually
 * @param {string} id - ID of a company
 * @returns {Promise} - A company object
 */
export function getCompanyCostsById(id) {
  return fetch(`${API_BASE}companies/${id}/costs`)
  .then(res => res.json());
}
