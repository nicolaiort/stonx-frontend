import axios from 'axios';
import UserStore from './UserStore';

interface config {
    baseurl_backend: string;
}

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        UserStore.logout();
    }
    return error;
});

export class ApiClient {
    static async getBitpandaCrypto(): Promise<any> {
        // @ts-ignore
        const res = await axios.get(`${config.baseurl_backend}/rest/bitpanda/assets/crypto`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async getBitpandaIndices(): Promise<any> {
        // @ts-ignore
        const res = await axios.get(`${config.baseurl_backend}/rest/bitpanda/assets/index`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async getBinanceSpot(): Promise<any> {
        // @ts-ignore
        const res = await axios.get(`${config.baseurl_backend}/rest/binance/wallets/spot`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async getWallets(): Promise<any> {
        // @ts-ignore
        const res = await axios.get(`${config.baseurl_backend}/rest/wallets`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async getMe(): Promise<any> {
        // @ts-ignore
        const res = await axios.get(`${config.baseurl_backend}/rest/users/me`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async getSupportedTokens(): Promise<any[]> {
        // @ts-ignore
        const res = await axios.get(`${config.baseurl_backend}/rest/status/tokens`);
        return res.data;
    }

    static async getSupportedExchanges(): Promise<any[]> {
        // @ts-ignore
        const res = await axios.get(`${config.baseurl_backend}/rest/status/exchanges`);
        return res.data;
    }

    static async createWallet(address: string, token: string, description?: string): Promise<any> {
        // @ts-ignore
        const res = await axios.post(`${config.baseurl_backend}/rest/wallets`, {
            "address": address,
            "token": token,
            "description": description
        }, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async deleteWallet(id: string): Promise<any> {
        // @ts-ignore
        const res = await axios.delete(`${config.baseurl_backend}/rest/wallets/${id}`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async addExchange(exchange: string, key: string, secret?: string): Promise<any> {
        switch (exchange) {
            case "BITPANDA":
                // @ts-ignore
                const resBitpanda = await axios.post(`${config.baseurl_backend}/rest/exchanges/bitpanda`, {
                    "exchange": exchange.toUpperCase(),
                    "bitpanda_api_key": key
                }, {
                    headers: { Authorization: `Bearer ${UserStore.state.token}` }
                });
                return resBitpanda.data;
            case "BINANCE":
                // @ts-ignore
                const resBinance = await axios.post(`${config.baseurl_backend}/rest/exchanges/binance`, {
                    "exchange": exchange.toUpperCase(),
                    "binance_api_key": key,
                    "binance_api_secret": secret
                }, {
                    headers: { Authorization: `Bearer ${UserStore.state.token}` }
                });
                return resBinance.data;
            default:
                throw new Error("Exchange not supported.");
        }
    }

    static async deleteExchange(exchange: string): Promise<any> {
        // @ts-ignore
        const res = await axios.delete(`${config.baseurl_backend}/rest/exchanges/${exchange}`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async login(email: string, password: string): Promise<any> {
        // @ts-ignore
        const res = await axios.post(`${config.baseurl_backend}/rest/auth/login`, {
            "email": email,
            "password": password
        }, { validateStatus: null });
        return { status: res.status, data: res.data };
    }

    static async signup(email: string, username: string, password: string): Promise<any> {
        // @ts-ignore
        const res = await axios.post(`${config.baseurl_backend}/rest/auth/signup`, {
            "password": password,
            "email": email,
            "username": username
        }, { validateStatus: null });

        return { data: res.data, status: res.status };
    }

    static async updateMe(email: string, username: string, password?: string): Promise<any> {
        if (password == "") { password = undefined; }

        // @ts-ignore
        const res = await axios.put(`${config.baseurl_backend}/rest/users/me`, {
            "password": password,
            "email": email,
            "username": username
        }, { headers: { Authorization: `Bearer ${UserStore.state.token}` }, validateStatus: null });

        return { data: res.data, status: res.status };
    }

    static async deleteMe(confirm: boolean): Promise<any> {
        // @ts-ignore
        const res = await axios.delete(`${config.baseurl_backend}/rest/users/me?confirm=${config.toString()}`, { headers: { Authorization: `Bearer ${UserStore.state.token}` } });
        return res.data;
    }

    static async getTotalTimeSeries(range: string): Promise<any> {
        // @ts-ignore
        return (await axios.get(`${config.baseurl_backend}/rest/timeseries/portfolio/${range}`, { headers: { Authorization: `Bearer ${UserStore.state.token}` } })).data;
    }

    static async getWalletTimeSeries(asset: string, id: string, range: string): Promise<any> {
        // @ts-ignore
        return (await axios.get(`${config.baseurl_backend}/rest/timeseries/wallets/${asset.toUpperCase()}/${id}/${range}`, { headers: { Authorization: `Bearer ${UserStore.state.token}` } })).data;
    }
    static async getBitpandaWalletTimeSeries(asset: string, range: string): Promise<any> {
        // @ts-ignore
        return (await axios.get(`${config.baseurl_backend}/rest/timeseries/bitpanda/wallets/${asset.toUpperCase()}/${range}`, { headers: { Authorization: `Bearer ${UserStore.state.token}` } })).data;
    }
    static async getBitpandaIndexTimeSeries(asset: string, range: string): Promise<any> {
        // @ts-ignore
        return (await axios.get(`${config.baseurl_backend}/rest/timeseries/bitpanda/indices/${asset.toUpperCase()}/${range}`, { headers: { Authorization: `Bearer ${UserStore.state.token}` } })).data;
    }
}