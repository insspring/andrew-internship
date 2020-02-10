import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import  {editUser} from "../helpers/api";

export default new Vuex.Store({
    state: {
        person: {},
    },
    mutations: {
        getPersonData(state, payload) {
            state.person = payload;
        },
        changePersonName(state) {
            editUser(state.person.id, {
                "name": "ffff",
                "email": "ffff@gmail.com",
                "password": "ffff1111",
                "id": 1
            });
        }
    },
    actions: {},
    modules: {}
});