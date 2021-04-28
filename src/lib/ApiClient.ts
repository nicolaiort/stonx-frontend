import axios from 'axios';

export let token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhY2NvdW50cy5leGFtcGxlc29mdC5jb20iLCJhdWQiOiJ5b3Vyc2l0ZS5uZXQiLCJzdWIiOiI4Nzc0NzdmOC1jZGI1LTRhZDYtYmUwZS02MmY0OTZkN2E3YjAiLCJleHAiOjE2MTk1NDk2NTEzMjQsImlhdCI6MTYxOTU0NjA1MTMyNH0.Guxt8KTipTExYMB_rX_BF8I7Yc-qbroAkWeumusIFpw";
export let baseurl: string = 'http://localhost:8083';

const axiosoptions = {
    headers: { Authorization: `Bearer ${token}}` }
}

export class ApiClient {
    static async getCrypto(): Promise<any> {
        const res = await axios.get(`${baseurl}/rest/bitpanda/assets/crypto`, axiosoptions);
        return res.data;
    }

    static async getIndices(): Promise<any> {
        const res = await axios.get(`${baseurl}/rest/bitpanda/assets/index`, axiosoptions);
        return res.data;
    }

    static async login(email: string, password: string): Promise<any> {
        const res = await axios.post(`${baseurl}/rest/auth/login`, {
            "email": email,
            "password": password
        });
        console.log(res.data.token);
    }
}