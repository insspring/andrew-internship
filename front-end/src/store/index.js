import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//import  {editUser} from "../helpers/api";

export default new Vuex.Store({
    strict: true,
    state: {
        person: {},
        flag: false,
        token: '',
        userData: {}
    },
    mutations: {
        getPersonData(state, payload) {
            state.person = payload;
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
        /*editPerson(state) {
            editUser(state.person.id, {
                name: state.person.name,
                id: state.person.id,
                email: state.person.email,
                password: state.person.password,
            });
        },*/
        changeName (state, name) {
            state.person.name = name;
        },
        changeEmail (state, email) {
            state.person.email = email;
        }
    },
    actions: {},
    modules: {}
});