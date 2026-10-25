'use strict';

const DISCOUNT_CODES = {
  SAVE10: { percent: 10 },
  VIP20: { percent: 20 },
};

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

function calculateTotals(items, discountCode) {
  validateItems(items);
  const subtotal = round(items.reduce((sum, item) => sum + item.price * item.qty, 0));

  let discount = 0;
  if (discountCode) {
    const promo = DISCOUNT_CODES[discountCode];
    if (!promo) throw badRequest(`unknown discount code ${discountCode}`);
    discount = round((subtotal * promo.percent) / 100);
  }

  return { currency: 'USD', subtotal, discount, total: round(subtotal - discount), discountCode: discountCode || null };
}

module.exports = { calculateTotals, DISCOUNT_CODES };
