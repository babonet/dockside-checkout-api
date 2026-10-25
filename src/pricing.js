'use strict';

function round(amount) {
  return Math.round(amount * 100) / 100;
}

function badRequest(message) {
  return Object.assign(new Error(message), { status: 400 });
}

function validateItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw badRequest('cart is empty');
  }
  for (const item of items) {
    if (!item.sku || !(item.qty > 0) || !(item.price >= 0)) {
      throw badRequest(`invalid cart item ${JSON.stringify(item)}`);
    }
  }
}

function calculateTotals(items) {
  validateItems(items);
  const subtotal = round(items.reduce((sum, item) => sum + item.price * item.qty, 0));
  return { currency: 'USD', subtotal, discount: 0, total: subtotal };
}

module.exports = { calculateTotals };
