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
        const res = await axios.get(`${config.baseurl_backend}/rest/bitpanda/assets/crypto`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async getBitpandaIndices(): Promise<any> {
        const res = await axios.get(`${config.baseurl_backend}/rest/bitpanda/assets/index`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async getWallets(): Promise<any> {
        const res = await axios.get(`${config.baseurl_backend}/rest/wallets`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async getSupportedTokens(): Promise<any> {
        const res = await axios.get(`${config.baseurl_backend}/rest/tokens`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async createWallet(address: string, token: string, description?: string): Promise<any> {
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
        const res = await axios.delete(`${config.baseurl_backend}/rest/wallets/${id}`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async login(email: string, password: string): Promise<any> {
        const res = await axios.post(`${config.baseurl_backend}/rest/auth/login`, {
            "email": email,
            "password": password
        });
        console.log("called login")
        return res.data;
    }
}