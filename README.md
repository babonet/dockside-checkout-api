# dockside-checkout-api

Prices carts and confirms orders for **Dockside Market**. Every purchase on the storefront goes through this service.

| | |
|---|---|
| Owner | Checkout team |
| Tier | 1 (revenue-critical) |
| Depends on | `dockside-payments-service`, `dockside-inventory-service` |
| Called by | `dockside-storefront-web` |

## API

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Liveness and version |
| `POST` | `/checkout` | Price a cart and confirm the order |

```json
POST /checkout
{ "items": [{ "sku": "SKU-1001", "qty": 2, "price": 19.99 }] }
```

## Run locally

```bash
npm start          # http://localhost:8080
npm test           # unit tests (node:test, no dependencies)
npm run smoke      # post-deploy smoke checks against a running instance
```

## Delivery pipeline

| Workflow | Trigger | What it does |
|---|---|---|
| `ci.yml` | Pull request | Unit tests |
| `deploy.yml` | Push to `main` | Tests, rollout to production, post-deploy smoke test. A failed smoke test raises an `alert` issue that Port ingests. |
| `rollback.yml` | Dispatched by Port | Opens and merges a revert PR, redeploys, and waits for verification |
| `followup.yml` | Dispatched by Port | Opens the postmortem follow-up issue and optionally assigns the GitHub Copilot coding agent |

> Part of the Dockside Market demo for Port's **self-healing incidents** solution. The production rollout is simulated inside the GitHub Actions runner; every signal Port sees (runs, alerts, PRs, reverts) is real.
