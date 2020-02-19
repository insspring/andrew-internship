import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
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
        getUser(state) {
            return state.user;
        },
        getUsers(state) {
            return state.users;
        },
        getFlag(state) {
            return state.flag;
        }
    },
    mutations: {
        visibleIn(state,payload) {
            state.visibleIn = payload;
        },
        visibleUp(state,payload) {
            state.visibleUp = payload;
        },
        setFlag(state,payload) {
            state.flag = payload;
        },
        setToken(state,payload) {
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
    actions: {
        visibleIn({commit},payload) {
            commit('visibleIn',payload);
        },
        visibleUp({commit},payload) {
            commit('visibleUp',payload);
        },
        setFlag({commit},payload) {
            commit('setFlag',payload);
        },
        setToken({commit},payload) {
            commit('setToken', payload);
        },
        userData({commit},payload) {
            commit('userData', payload);
        },
        users({commit},payload) {
            commit('users', payload);
        },
        user({commit},payload) {
            commit('user', payload);
        },
        books({commit},payload) {
            commit('books', payload);
        },
        userBooks({commit},payload) {
            commit('userBooks', payload);
        },
    },
    modules: {}
});