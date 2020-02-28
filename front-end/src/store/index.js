import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import {getUser} from "../helpers/api";
import {booksPagination} from "../helpers/api";

export default new Vuex.Store({
    state: {
        flag: false,
        token: '',
        userData: [],
        user: {},
        visibleIn: false,
        visibleUp: false,
        page: 1,
        booksFeed: [],
        loading: false,
        stop: false,
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
        },
        getLoading(state) {
            return state.loading;
        },
        getPage(state) {
            return state.page;
        },
        getBooks(state) {
            return state.booksFeed;
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
        setTokenData(state,{flag,token,userData,stop}) {
            state.flag = flag;
            state.token = token;
            state.userData = userData;
            getUser(state.token).then(result => {
                state.user = result.data.find(item =>
                    item.email === Object.values(state.userData)[0] && item.password === Object.values(state.userData)[1]);
            });
            if(!stop) {
                booksPagination(state.token, state.page).then(result => {
                    state.booksFeed.push(...result.data);
                    state.page++;
                    state.loading = false;
                })
            }
        },
        loadingProcess(state,payload) {
            state.loading = payload;
        },
        setBooks(state,payload) {
            state.booksFeed.push(...payload);
            state.page++;
            state.loading = false;
        },
        discardBooksFeed(state) {
            state.booksFeed = [];
            state.page = 1;
        },
    },
    actions: {
        discardBooksFeed({commit}) {
            commit('discardBooksFeed');
        },
        visibleIn({commit},payload) {
            commit('visibleIn',payload);
        },
        visibleUp({commit},payload) {
            commit('visibleUp',payload);
        },
        setFlag({commit},payload) {
            commit('setFlag',payload);
        },
        setTokenData({commit},{flag,token,userData,stop}) {
            commit('setTokenData',{flag,token,userData,stop});
        },
        setBooks({commit},payload) {
            commit('setBooks',payload);
        },
        loadingProcess({commit},payload) {
            commit('loadingProcess', payload);
        },
    },
    modules: {}
});