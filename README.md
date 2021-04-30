# stonx-frontend

A simple dashboard for viewing some of your assets.
Information aggregation is powered by stonx-backend.

Powered by (among many others):
* [SvelteKit](https://kit.svelte.dev/)
* [Tailwind](https://tailwindcss.com/)
* [Axios](https://axios-http.com/)
* [Localforage](https://localforage.github.io/localForage/)
* [Marked](https://marked.js.org/)

## Supported assets (frontend)
> Warning: We currently save your bitpanda api keys in plaintext in the backend's db
* Bitpanda Wallets (Needs a bitpanda api token that can read your assets)
* Bitpanda Indices (Needs a bitpanda api token that can read your assets)
* ETH Wallets (Only needs the public key/address)
* BTC Wallets (Only needs the public key/address)

## Views
* [x] Dashboard: View total stats for all assets
* [x] Bitpanda: Details about your bitpanda assets
* [x] Wallets: Details about your external Wallets

## Dev Setup 🛠
```bash
yarn
yarn dev --open
```