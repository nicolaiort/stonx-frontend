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
| Setting | User settings - Update your email, username, password and bitpanda api key |
| About | As the name suggests: An about page that also lists all npm packages used in the frontend (coming soon) |
| Login | As the name suggests: The login screen. You have to provide an email address and password in order to log in |
| Register/Signup | As the name suggests: The signup screen. You have to provide an email address, username, password and bitpanda api key to sign up. |

### Roadmap
> For supported tokens and some other data related features take a look at [the backend roadmap](https://github.com/nicolaiort/stonx-backend#readme)

* User settings -> Delete User
* Wallet address validation

## Config
You can configure the frontend via a 'env.js' file.
This file resides in the static folder and can be overwritten by mounting a file following the same scheme into the docker container `./env.js:/usr/share/nginx/html/env.js`

## Dev Setup 🛠
```bash
yarn
yarn dev --open
```