import { writable } from 'svelte/store';
import localForage from 'localforage';

const userStore = () => {
    const state = {
        token: undefined,
        email: undefined,
        username: undefined,
        isLoggedIn: false,
        exchanges: [],
        refreshInterval: undefined
    };

    const { subscribe, set, update } = writable(state);

    const methods = {
        init() {
            localForage.config({
                name: 'stonks',
                version: 1.0,
                storeName: 'stonks_frontend',
                description: 'Stonks Dashboard'
            });
        },
        login(authresponse) {
            update((state) => {
                state.token = authresponse.token;
                state.email = authresponse.email;
                state.username = authresponse.username || authresponse.email;
                state.exchanges = authresponse.exchanges;
                state.isLoggedIn = true;
                //
                localForage.setItem("userdata", state);
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
        },
        addExchange(exchange) {
            update((state) => {
                state.exchanges.push(exchange);
                localForage.setItem("userdata", state)
                return state;
            });
        },
        removeExchange(exchange) {
            update((state) => {
                state.exchanges = state.exchanges.filter((x) => x != exchange);
                localForage.setItem("userdata", state)
                return state;
            });
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