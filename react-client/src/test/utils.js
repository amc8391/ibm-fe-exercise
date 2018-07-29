import * as uuid from 'uuid';

export function getRandomString() {
  return uuid.v4();
}

export function getRandomNumber() {
  return Math.random(-1000, 1000);
}

export function getRandomCompany() {
  return {
    name: getRandomString(),
    id: getRandomString()
  };
}

export function getRandomEmployee() {
  return {
    firstName: getRandomString(),
    lastName: getRandomString(),
    address: getRandomString(),
  };
}
