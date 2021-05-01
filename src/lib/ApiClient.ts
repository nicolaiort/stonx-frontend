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

    static async getSupportedTokens(): Promise<any> {
        // @ts-ignore
        const res = await axios.get(`${config.baseurl_backend}/rest/tokens`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
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

    static async login(email: string, password: string): Promise<any> {
        // @ts-ignore
        const res = await axios.post(`${config.baseurl_backend}/rest/auth/login`, {
            "email": email,
            "password": password
        });
        return res.data;
    }

    static async signup(email: string, username: string, password: string, bitpanda_api_key: string): Promise<any> {
        // @ts-ignore
        const res = await axios.post(`${config.baseurl_backend}/rest/auth/signup`, {
            "password": password,
            "email": email,
            "username": username,
            "bitpanda_api_key": bitpanda_api_key
        }, { validateStatus: null });

        return { data: res.data, status: res.status };
    }

    static async updateMe(email: string, username: string, password?: string, bitpanda_api_key?: string): Promise<any> {
        if (password == "") { password = undefined; }
        if (bitpanda_api_key == "") { bitpanda_api_key = undefined; }

        // @ts-ignore
        const res = await axios.put(`${config.baseurl_backend}/rest/users/me`, {
            "password": password,
            "email": email,
            "username": username,
            "bitpanda_api_key": bitpanda_api_key
        }, { validateStatus: null });

        return { data: res.data, status: res.status };
    }
}