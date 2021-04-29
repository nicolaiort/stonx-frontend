import axios from 'axios';
import UserStore from './UserStore';
let baseurl: string = 'http://localhost:8083';

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
        const res = await axios.get(`${baseurl}/rest/bitpanda/assets/crypto`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async getBitpandaIndices(): Promise<any> {
        const res = await axios.get(`${baseurl}/rest/bitpanda/assets/index`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async getWallets(): Promise<any> {
        const res = await axios.get(`${baseurl}/rest/wallets`, {
            headers: { Authorization: `Bearer ${UserStore.state.token}` }
        });
        return res.data;
    }

    static async login(email: string, password: string): Promise<any> {
        const res = await axios.post(`${baseurl}/rest/auth/login`, {
            "email": email,
            "password": password
        });
        console.log("called login")
        return res.data;
    }
}