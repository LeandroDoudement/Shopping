require('../mocks/fetchSimulator');
const { expect } = require('chai');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  expect(typeof fetchProducts).toEqual('function');
  fail('Teste vazio');
});
