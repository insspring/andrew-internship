import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        flag: false,
        token: '',
        userData: [],
        users: [],
        user: {}
    },
    getters: {
        setUser(state) {
            return state.user;
        }
    },
    mutations: {
        flag(state,payload) {
            state.flag = payload;
        },
        token(state,payload) {
            state.token = payload;
        },
        userData(state,payload) {
            state.userData = payload;
        },
        users(state,payload) {
            state.users = payload
        },
        user(state,payload) {
            state.user = payload
        },
    },
    actions: {},
    modules: {}
});