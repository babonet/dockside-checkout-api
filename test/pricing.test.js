'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateTotals } = require('../src/pricing');

test('sums line items into the order total', () => {
  const totals = calculateTotals([
    { sku: 'SKU-1001', qty: 2, price: 19.99 },
    { sku: 'SKU-2002', qty: 1, price: 5 },
  ]);
  assert.equal(totals.subtotal, 44.98);
  assert.equal(totals.total, 44.98);
});

test('rejects an empty cart', () => {
  assert.throws(() => calculateTotals([]), /cart is empty/);
});

test('rejects items with a non-positive quantity', () => {
  assert.throws(() => calculateTotals([{ sku: 'SKU-1001', qty: 0, price: 10 }]), /invalid cart item/);
});

test('applies the SAVE10 discount code', () => {
  const totals = calculateTotals([{ sku: 'SKU-1001', qty: 2, price: 50 }], 'SAVE10');
  assert.equal(totals.discount, 10);
  assert.equal(totals.total, 90);
});

test('applies the VIP20 discount code', () => {
  const totals = calculateTotals([{ sku: 'SKU-1001', qty: 1, price: 100 }], 'VIP20');
  assert.equal(totals.discount, 20);
  assert.equal(totals.total, 80);
});

test('rejects unknown discount codes', () => {
  assert.throws(() => calculateTotals([{ sku: 'SKU-1001', qty: 1, price: 10 }], 'BOGUS'), /unknown discount code/);
});
