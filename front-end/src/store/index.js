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
        },
        setUsers(state,{users,user}) {
            state.users = users;
            state.user = user;
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
        setUsers({commit},{users,user}) {
            commit('setUsers',{users,user});
        },
    },
    modules: {}
});