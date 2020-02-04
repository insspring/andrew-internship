<template>
    <div class="header">
        <img class="logo" src="../assets/logo.png">
        <LocaleChange></LocaleChange>
        <div v-if="!token">
            <ButtonTemplate
                    :text="$t('signUp')"
                    @makeVisible="visibleUp = $event"
            ></ButtonTemplate>
            <ButtonTemplate
                    :text="$t('signIn')"
                    @makeVisible="visibleIn = $event"
            ></ButtonTemplate>
                <div class="signUp" v-if="visibleUp">
                    <div class="signUpContent">
                        <span class="close" @click="closeForm">X</span>
                        <div class="inputFields" @keyup.enter="createPerson">
                            <InputTemplate v-model="name"
                                           :placeholder="$t('name')"
                                           :error="{error: classErrorName}"
                                           @startTyping="startPrintingName()"
                            ></InputTemplate>
                            <InputTemplate v-model="email"
                                           :placeholder="$t('email')"
                                           :error="{error: classErrorEmail}"
                                           @startTyping="startPrintingEmail()"
                            ></InputTemplate>
                            <InputTemplate v-model="password"
                                           :type = "'password'"
                                           :placeholder="$t('password')"
                                           :error="{error: classErrorPassword}"
                                           @startTyping="startPrintingPassword()"
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
                                           @startTyping="startPrintingPasswordConfirm()"
                            ></InputTemplate>
                            <ButtonTemplate
                                    :text="$t('submit')"
                                    @createPerson="createPerson"
                            ></ButtonTemplate>
                        </div>
                    </div>
                </div>
                <div class="signIn" v-if="visibleIn">
                    <div class="signInContent">
                        <span class="close" @click="closeForm">X</span>
                        <div class="inputFields" @keyup.enter="logPerson">
                            <InputTemplate v-model="email"
                                           :placeholder="$t('email')"
                                           :error="{error: classErrorEmail}"
                                           @startTyping="startPrintingEmail()"
                            ></InputTemplate>
                            <InputTemplate v-model="password"
                                           :type = "'password'"
                                           :placeholder="$t('password')"
                                           :error="{error: classErrorPassword}"
                                           @startTyping="startPrintingPassword()"
                            ></InputTemplate>
                            <ButtonTemplate
                                    :text="$t('submit')"
                                    @logPerson="logPerson"
                            ></ButtonTemplate>
                        </div>
                    </div>
                </div>
        </div>
        <ButtonTemplate
                v-if="token"
                :text="$t('signOut')"
                @deleteToken="deleteToken"
        ></ButtonTemplate>
    </div>
</template>

<script>
    import {signUpUser} from "../helpers/api";
    import {signInUser} from "../helpers/api";
    import {emailValidation} from "../helpers/validation";
    import {nameValidation} from "../helpers/validation";
    import {passwordValidation} from "../helpers/validation";
    import {passwordConfirmFunc} from "../helpers/validation";
    import LocaleChange from "./LocaleChange";
    import InputTemplate from "./InputTemplate";
    import ButtonTemplate from "./ButtonTemplate";

    export default {
        name: "Header",
        components: {ButtonTemplate, InputTemplate, LocaleChange},
        data() {
            return {
                visibleUp: false,
                visibleIn: false,
                hint: false,
                name: null,
                email: null,
                password: null,
                passwordConfirm: null,
                classErrorName: false,
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
            deleteToken() {
              localStorage.removeItem('accessToken');
              this.token = false;
            },
            startPrintingName(title) {
                this.classErrorName = title;
            },
            startPrintingEmail(title) {
                this.classErrorEmail = title;
            },
            startPrintingPassword(title) {
                this.classErrorPassword = title;
            },
            startPrintingPasswordConfirm(title) {
                this.classErrorPasswordConfirm = title;
            },
            createPerson() {
                if(nameValidation(this.name) && emailValidation(this.email) && passwordValidation(this.password) && passwordConfirmFunc(this.password,this.passwordConfirm)) {
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
                    if(!nameValidation(this.name) || this.name == null) {
                        this.classErrorName = true;
                        this.name = null;
                    }
                    if(!emailValidation(this.email)) {
                        this.classErrorEmail = true;
                        this.email = null;
                    }
                    if(!passwordValidation(this.password)) {
                        this.classErrorPassword = true;
                        this.modalStatus = true;
                        setTimeout(() => {this.modalStatus = false}, 5000);
                        this.password = null;
                    }
                    if(!passwordConfirmFunc(this.password,this.passwordConfirm)) {
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

<style scoped>
    .signUp, .signIn {
        position: fixed;
        z-index: 1;
        padding-top: 3rem;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgba(0,0,0,0.7);
    }
    .signUpContent, .signInContent {
        background-color: white;
        margin: auto;
        padding: 2rem;
        border: 1px solid grey;
        width: 20%;
        border-radius: 1.5rem;
    }
    .close {
        color: gray;
        float: right;
        font-size: 1rem;
        font-weight: bold;
    }
    .close:hover {
        color: black;
        cursor: pointer;
    }
    .inputFields {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .hint {
        position: absolute;
        display: block;
        text-align: left;
        padding: 1rem;
        border-radius: 1rem;
        background-color: gainsboro;
        font-size: .7rem;
        width: 10%;
        right: 30rem;
        top: 11rem
    }
    .error {
        border-color: red;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 1;
        background-color: black;
        font-family: Arial;
    }
    .logo {
        align-self: flex-start;
    }
</style>