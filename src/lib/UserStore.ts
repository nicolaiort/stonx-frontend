import { writable } from 'svelte/store';
import localForage from 'localforage';

export let users = writable([]);
export let tracks = writable([]);
const userStore = () => {
    const state = {
        token: undefined,
        email: undefined,
        isLoggedIn: false,
        refreshInterval: undefined
    };

    const { subscribe, set, update } = writable(state);

    const methods = {
        init() {
            localForage.config({
                name: 'stonks',
                version: 1.0,
                storeName: 'stonks',
                description: 'Stonks Dashboard'
            });
        },
        login(authresponse) {
            update((state) => {
                state.token = authresponse.token;
                state.email = authresponse.email;
                state.isLoggedIn = true;
                //
                localForage.setItem("userdata", authresponse);
                //
                state.refreshInterval = setInterval(() => {
                    //this.refreshAuth();
                    // 2min
                }, 2 * 60000);
                //
                return state;
            });
        },
        logout() {
            update((state) => {
                state.isLoggedIn = false;
                state.token = undefined;
                //
                clearInterval(state.refreshInterval);
                state.refreshInterval = undefined;
                localForage.clear();
                //
                return state;
            });
            location.replace("/");
        }
    };

    return {
        subscribe,
        set,
        update,
        state,
        ...methods
    };
};
export default userStore();