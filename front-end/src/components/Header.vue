<template>
    <div class="header">
        <div class="logo">
            <img class="logo__img" src="../assets/logo.png">
        </div>
        <div class="menu burgerMenu" :class="{ active: opened }">
            <div class="menu-content burgerMenuContent">
                <router-link class="router-link" to="/">{{ $t('home') }}</router-link>
                <router-link v-if="token" class="router-link" to="/profile">{{ $t('profile') }}</router-link>
                <ButtonTemplate
                        class="btn-menu"
                        v-if="!token"
                        :text="$t('signUp')"
                        :method="visibleUpFunc"
                ></ButtonTemplate>
                <ButtonTemplate
                        class="btn-menu"
                        v-if="!token"
                        :text="$t('signIn')"
                        :method="visibleInFunc"
                ></ButtonTemplate>
                <ButtonTemplate
                        class="btn-menu"
                        v-if="token"
                        :text="$t('signOut')"
                        :method="deleteToken"
                ></ButtonTemplate>
                <LocaleChange></LocaleChange>
            </div>
        </div>
        <div class="menu-btn" @click="openMenu" :class="{ change: opened }"></div>
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
    import {signUpUser} from "../helpers/api";
    import {signInUser} from "../helpers/api";
    import {validation} from "../helpers/validation";
    import InputTemplate from "./InputTemplate";
    import ButtonTemplate from "./ButtonTemplate";
    import LocaleChange from "./LocaleChange";

    export default {
        name: "Header",
        components: {LocaleChange, ButtonTemplate, InputTemplate},
        data() {
            return {
                opened: false,
                visibleUp: false,
                visibleIn: false,
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
                token: false,
            }
        },
        created() {
            if(localStorage.getItem('accessToken')) {
                this.token = true;
            }
        },
        methods: {
            openMenu() {
                this.opened = !this.opened;
            },
            visibleInFunc() {
                this.visibleIn = true;
            },
            visibleUpFunc() {
                this.visibleUp = true;
            },
            deleteToken() {
              localStorage.removeItem('accessToken');
              this.token = false;
            },
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
                        this.visibleUp = false;
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
            getPersonData(data) {
                this.$store.commit('getPersonData',data);
            },
            logPerson() {
                let person = {
                    email: this.email,
                    password: this.password
                };
                signInUser(person).then(result => {
                    localStorage.setItem('accessToken', result.data.access_token);
                    this.getPersonData(result.data.user);
                    this.email = null;
                    this.password = null;
                    this.classErrorEmail = false;
                    this.classErrorPassword = false;
                    this.visibleIn = false;
                    this.token = true;
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
                this.visibleUp = false;
                this.visibleIn = false;
                this.classErrorName = false;
                this.classErrorEmail = false;
                this.classErrorPassword = false;
                this.classErrorPasswordConfirm = false;
            },

        }
    }
</script>

<style lang="scss" scoped>

    @import '../scss/mixins.scss';

    .header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 5rem;
        background-color: rgb(36, 36, 35);
        box-shadow: 0 .1rem 1rem .1rem rgb(36, 36, 35);

        @include for-size (phone-only) {
            justify-content: space-around;
        }
    }

    .logo {
        padding: 1rem;
        grid-column: 1 / 2;
        justify-self: center;
        width: 20rem;
        min-width: 10rem;
    }
    .logo__img {
        margin-top: .5rem;
        width: 100%;
    }

    .menu-btn {
        display: none;
        margin: 1rem;
        width: 2rem;
        cursor: pointer;
        min-width: 1.5rem;

        @include for-size (phone-only) {
            display: block;
        }
    }
    .menu-btn:hover:before,
    .menu-btn:hover:after {
        background-color: rgb(253, 253, 255);
    }
    .menu-btn:before,
    .menu-btn:after {
        background-color: rgb(213, 213, 215);
        border-radius: 1rem;
        content: '';
        display: block;
        height: .3rem;
        transition: all 200ms ease-in-out;
    }
    .menu-btn:before {
        box-shadow: 0 10px 0 rgb(213, 213, 215);
        margin-bottom: 16px;
    }
    .change:before {
        box-shadow: 0 0 0 #fff;
        transform: translateY(10px) rotate(45deg);
        z-index: 2;
    }
    .change:after{
        transform: translateY(-10px) rotate(-45deg);
        z-index: 2;
    }

    .menu {

        @include for-size (phone-only) {
        }
    }
    .menu-content {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .burgerMenu {

        @include for-size (phone-only) {
            display: none;
            height: 100%;
            width: 100%;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,0.3);
            overflow: hidden;
            transition: 1s;
        }
    }
    .burgerMenuContent {

        @include for-size (phone-only) {
            margin-top: 5rem;
            float: right;
            height: 100%;
            width: 15rem;
            background-color: rgb(36, 36, 35);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }
    }
    .active {

        @include for-size (phone-only) {
            display: block;
        }
    }
    .router-link {
        margin-right: .5rem;
        padding: .6rem .8rem .6rem .8rem;
        border-radius: .5rem;
        font-weight: bold;
        cursor: pointer;
        background-color: rgb(46, 46, 45);
        color: rgb(213, 213, 215);
        border: 2px solid rgb(63, 63, 65);

        @include for-size(phone-only) {
            margin-left: .6rem;
            border-radius: .1rem;
            border: 1px solid rgb(43, 43, 45);
            background-color: transparent;
            width: 100%;
            text-align: center;
        }
    }
    .router-link-active {
    }

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