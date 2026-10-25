'use strict';

const { randomUUID } = require('node:crypto');
const { calculateTotals } = require('./pricing');
const pkg = require('../package.json');

const routes = [
  {
    method: 'POST',
    match: (path) => (path === '/checkout' ? {} : null),
    handler: async ({ body }) => {
      const totals = calculateTotals(body.items);
      return { status: 200, body: { orderId: randomUUID(), status: 'confirmed', ...totals } };
    },
  },
];

module.exports = { service: pkg.name, version: pkg.version, routes };
