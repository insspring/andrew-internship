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
        user: {},
        books: [],
        userBooks: [],
        visibleIn: false,
        visibleUp: false,
    },
    getters: {
        setUser(state) {
            return state.user;
        },
    },
    mutations: {
        visibleIn(state,payload) {
            state.visibleIn = payload;
        },
        visibleUp(state,payload) {
            state.visibleUp = payload;
        },
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
            state.users = payload;
        },
        user(state,payload) {
            state.user = payload;
        },
        books(state,payload) {
            state.books = payload;
        },
        userBooks(state,payload) {
            state.userBooks = payload;
        },
    },
    actions: {},
    modules: {}
});