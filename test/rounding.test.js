'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateTotals } = require('../src/pricing');

test('rounds fractional prices to cents', () => {
  assert.equal(calculateTotals([{ sku: 'SKU-1', qty: 3, price: 0.1 }]).total, 0.3);
});
