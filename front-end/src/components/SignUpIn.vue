<template>
    <div>
        <div class="signUp" v-if="visibleUp">
            <div class="signUpContent">
                <span class="close" @click="closeForm">X</span>
                <div class="inputFields">
                    <InputTemplate v-model="name"
                                   :placeholder="$t('name')"
                                   :error="{error: classErrorName}"
                                   :method="startPrintingName"
                    ></InputTemplate>
                    <InputTemplate v-model="email"
                                   :placeholder="$t('email')"
                                   :error="{error: classErrorEmail}"
                                   :method="startPrintingEmail"
                    ></InputTemplate>
                    <InputTemplate v-model="password"
                                   :type = "'password'"
                                   :placeholder="$t('password')"
                                   :error="{error: classErrorPassword}"
                                   :method="startPrintingPassword"
                    ></InputTemplate>
                    <ul class="hint" v-if="modalStatus">
                        <li>{{ $t('passwordHint1') }}</li>
                        <li>{{ $t('passwordHint2') }}</li>
                        <li>{{ $t('passwordHint3') }}</li>
                    </ul>
                    <InputTemplate v-model="passwordConfirm"
                                   :type = "'password'"
                                   :placeholder="$t('passwordConfirm')"
                                   :error="{error: classErrorPasswordConfirm}"
                                   :method="startPrintingPasswordConfirm"
                    ></InputTemplate>
                    <ButtonTemplate
                            :text="$t('submit')"
                            :method="createPerson"
                            class="btn-submit"
                    ></ButtonTemplate>
                </div>
            </div>
        </div>
        <div class="signIn" v-if="visibleIn">
            <div class="signInContent">
                <span class="close" @click="closeForm">X</span>
                <div class="inputFields">
                    <InputTemplate v-model="email"
                                   :placeholder="$t('email')"
                                   :error="{error: classErrorEmail}"
                                   :method="startPrintingEmail"
                    ></InputTemplate>
                    <InputTemplate v-model="password"
                                   :type = "'password'"
                                   :placeholder="$t('password')"
                                   :error="{error: classErrorPassword}"
                                   :method="startPrintingPassword"
                    ></InputTemplate>
                    <ButtonTemplate
                            :text="$t('submit')"
                            :method="logPerson"
                            class="btn-submit"
                    ></ButtonTemplate>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ButtonTemplate from "./templates/ButtonTemplate";
    import InputTemplate from "./templates/InputTemplate";
    import {validation} from "../helpers/validation";
    import {signUpUser} from "../helpers/api";
    import {signInUser} from "../helpers/api";
    import {getUser} from "../helpers/api";
    import {parseJwt} from "../helpers/parsingToken";
    import {getBooks} from "../helpers/api";
    import {mapState} from "vuex";

    export default {
        name: "SignUpIn",
        data() {
            return {
                opened: false,
                hint: false,
                name: null,
                email: null,
                password: null,
                passwordConfirm: null,
                classErrorName: false,
                classErrorEmail: false,
                classErrorPassword: false,
                classErrorPasswordConfirm: false,
                modalStatus: false,
            }
        },
        components: {InputTemplate, ButtonTemplate},
        computed: {
            ...mapState(['visibleIn', 'visibleUp'])
        },
        methods: {
            startPrintingName() {
                this.classErrorName = false;
            },
            startPrintingEmail() {
                this.classErrorEmail = false;
            },
            startPrintingPassword() {
                this.classErrorPassword = false;
            },
            startPrintingPasswordConfirm() {
                this.classErrorPasswordConfirm = false;
            },
            createPerson() {
                if(validation('name',this.name) && validation('email',this.email) && validation('password',this.password) && validation('confirm',this.password,this.passwordConfirm)) {
                    let person = {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                    };
                    signUpUser(person).then(() => {
                        this.name = null;
                        this.email = null;
                        this.password = null;
                        this.passwordConfirm = null;
                        this.$store.commit('visibleUp',false);
                        alert("You've been successfully signed up!");
                    }).catch(() => {
                        this.name = null;
                        this.email = null;
                        this.password = null;
                        this.passwordConfirm = null;
                        alert('You have already been registered!');
                    });
                } else {
                    if(!validation('name',this.name) || this.name == null) {
                        this.classErrorName = true;
                        this.name = null;
                    }
                    if(!validation('email',this.email)) {
                        this.classErrorEmail = true;
                        this.email = null;
                    }
                    if(!validation('password',this.password)) {
                        this.classErrorPassword = true;
                        this.modalStatus = true;
                        setTimeout(() => {this.modalStatus = false}, 3000);
                        this.password = null;
                    }
                    if(!validation('confirm',this.password,this.passwordConfirm)) {
                        this.classErrorPasswordConfirm = true;
                        this.passwordConfirm = null;
                    }
                }
            },
            logPerson() {
                let person = {
                    email: this.email,
                    password: this.password
                };
                signInUser(person).then(result => {
                    localStorage.setItem('accessToken', result.data.access_token);
                    this.$store.dispatch('setFlag',true);
                    this.$store.dispatch('setToken',localStorage.getItem('accessToken'));
                    this.$store.dispatch('userData', parseJwt(localStorage.getItem('accessToken')));
                    getUser(this.$store.state.token).then(result => {
                        this.$store.dispatch('users',result.data);
                        let user = this.$store.state.users.find(item =>
                            item.email === Object.values(this.$store.state.userData)[0] && item.password === Object.values(this.$store.state.userData)[1]);
                        this.$store.dispatch('user',user);
                    });
                    getBooks(this.$store.state.token).then(result => {
                        console.log(result);
                        this.$store.dispatch('books',result.data);
                        let userBooks = this.$store.state.books.filter(item =>
                            item.author === this.$store.state.user.name);
                        this.$store.dispatch('userBooks',userBooks);
                    });
                    this.email = null;
                    this.password = null;
                    this.classErrorEmail = false;
                    this.classErrorPassword = false;
                    this.$store.commit('visibleIn',false);
                    alert('Welcome again!');
                }).catch(() => {
                    this.email = null;
                    this.password = null;
                    this.classErrorEmail = true;
                    this.classErrorPassword = true;
                });
            },
            closeForm() {
                this.name = null;
                this.email = null;
                this.password = null;
                this.passwordConfirm = null;
                this.$store.dispatch('visibleIn',false);
                this.$store.dispatch('visibleUp',false);
                this.classErrorName = false;
                this.classErrorEmail = false;
                this.classErrorPassword = false;
                this.classErrorPasswordConfirm = false;
            },
        }
    }
</script>

<style scoped>
    .signUp, .signIn {
        position: fixed;
        z-index: 3;
        padding-top: 3rem;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgba(0,0,0,0.6);
    }
    .signUpContent, .signInContent {
        background-color: rgb(76, 76, 75);
        margin: 0 auto;
        padding: 2rem;
        width: 30%;
        min-width: 10rem;
        border-radius: 1.5rem;
    }
    .close {
        color: rgb(106, 106, 105);;
        float: right;
        font-size: 1rem;
        font-weight: bold;
    }
    .close:hover {
        color: rgb(245, 245, 245);
        cursor: pointer;
    }
    .inputFields {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .hint {
        position: absolute;
        text-align: left;
        padding: 1rem;
        border-radius: 1rem;
        background-color: gainsboro;
        font-size: .7rem;
        width: 10%;
        min-width: 12rem;
        top: 5.5rem;
    }
</style>