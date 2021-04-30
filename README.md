# stonx-frontend

A simple dashboard for viewing some of your assets.
Information aggregation is powered by [stonx-backend](https://github.com/nicolaiort/stonx-backend).

Powered by (among many others):
* [SvelteKit](https://kit.svelte.dev/)
* [Tailwind](https://tailwindcss.com/)
* [Axios](https://axios-http.com/)
* [Localforage](https://localforage.github.io/localForage/)
* [Marked](https://marked.js.org/)
* [base64-cryptocurrency-icons](https://github.com/onramper/small-open-datasets/tree/master/base64-cryptocurrency-icons#readme)

## Features
### Supported assets (powered by stonx-backend)
> Warning: We currently save your bitpanda api keys in plaintext in the backend's db
* Bitpanda Wallets (Needs a bitpanda api token that can read your assets)
* Bitpanda Indices (Needs a bitpanda api token that can read your assets)
* ETH Wallets (Only needs the public key/address)
* BTC Wallets (Only needs the public key/address)
* DOGE Wallets (Only needs the public key/address)

### Frontend Views
| View | Description |
| - | - |
| Dashboard | Get a quick overview of your current portfolio status |
| Bitpanda | See all of your bitpanda assets |
| Wallets | See all of your custom added wallets and add new wallets |
| About | As the name suggests: An about page that also lists all npm packages used in the frontend (coming soon) |

### Roadmap
> For supported tokens take a look at [the backend roadmap](https://github.com/nicolaiort/stonx-backend#readme)
* Confugure backend via env (or env.js)

## Dev Setup 🛠
```bash
yarn
yarn dev --open
```