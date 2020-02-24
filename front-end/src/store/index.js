import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import {getUser} from "../helpers/api";

export default new Vuex.Store({
    state: {
        flag: false,
        token: '',
        userData: [],
        users: [],
        user: {},
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
        },
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
        setTokenData(state,{flag,token,userData}) {
            state.flag = flag;
            state.token = token;
            state.userData = userData;
            getUser(state.token).then(result => {
                state.users = result.data;
                state.user = result.data.find(item =>
                    item.email === Object.values(state.userData)[0] && item.password === Object.values(state.userData)[1]);
            });
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
        setTokenData({commit},{flag,token,userData}) {
            commit('setTokenData',{flag,token,userData});
        },
    },
    modules: {}
});