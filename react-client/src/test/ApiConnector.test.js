import * as api from '../ApiConnector';
import { getRandomString, getRandomCompany, getRandomEmployee, getRandomNumber } from './utils';

const API_BASE = '/api/'

describe('Testing API connector', () => {
  beforeEach(() => {
    fetch.resetMocks();
  })

  describe('createEmployee', () => {
    it('Sends a POST request to the API endpoint and returns a response', () => {
      // Arrange
      const inputEmployee = getRandomEmployee()
      const expectedEmployee = getRandomEmployee()
      
      fetch.mockResponseOnce(JSON.stringify(expectedEmployee))

      // Act
      api.createEmployee(inputEmployee)
      // Assert
      .then(newEmployee => {
        expect(newEmployee).toEqual(expectedEmployee)
      })
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual(API_BASE + 'employees')
      expect(fetch.mock.calls[0][1].method).toEqual('POST')
    })
  })

  describe('findOneCompanyByName', () => {
    it('Sends a GET request to the API endpoint and returns a response', () => {
      // Arrange
      const inputName = getRandomString()
      const expectedCompany = getRandomCompany()
      fetch.mockResponseOnce(JSON.stringify(expectedCompany))

      // Act
      api.findOneCompanyByName(inputName)
      // Assert
      .then(company => { 
        expect(company).toEqual(expectedCompany)
      })
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual(API_BASE + 'companies/findOne?filter[where][name]=' + inputName)
      expect(fetch.mock.calls[0].length).toEqual(1) // No arguments indicates GET request
    })
  })

  describe('createCompany', () => {
    it('Sends a POST request to the API endpoint and returns a response', () => {
      // Arrange
      const inputCompany = {
        name: getRandomString()
      }
      const expectedOutputCompany = {
        name: getRandomString(),
        id: getRandomString()
      }
      fetch.mockResponseOnce(JSON.stringify(expectedOutputCompany))
      
      // Act
      api.createCompany(inputCompany)
      // Assert
      .then(company => {
        expect(company).toEqual(expectedOutputCompany)
      })
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual(API_BASE + 'companies')
      expect(fetch.mock.calls[0][1].method).toEqual('POST')
    })
  })

  describe('getCompanyList', () => {
    it('Sends a GET request to the API endpoint and returns a response', () => {
      // Arrange
      const expectedCompanyList = [
        getRandomCompany(),
        getRandomCompany(),
        getRandomCompany(),
      ]

      fetch.mockResponseOnce(JSON.stringify(expectedCompanyList))

      // Act
      api.getCompanyList()
      // Assert
      .then(companyList => { 
        expect(companyList).toEqual(expectedCompanyList)
      })
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual(API_BASE + 'companies')
      expect(fetch.mock.calls[0].length).toEqual(1) // No arguments indicates GET request
    })
  })

  describe('getCompanyCostsById', () => {
    it('Sends a GET request to the API endpoint and returns a response', () => {
      // Arrange
      const inputCompanyId = getRandomString();
      const expectedCost = {
        totalCost: getRandomNumber()
      };
      fetch.mockResponseOnce(JSON.stringify(expectedCost))

      // Act
      api.getCompanyCostsById(inputCompanyId)
      // Assert
      .then(companyCosts => { 
        expect(companyCosts).toEqual(expectedCost)
      })
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual(API_BASE + 'companies/' + inputCompanyId + '/costs')
      expect(fetch.mock.calls[0].length).toEqual(1) // No arguments indicates GET request
    })
  })
})

