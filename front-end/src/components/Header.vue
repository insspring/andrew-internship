<template>
    <div class="header">
        <button class="signUpBtn" @click="visibleUp = true">{{ $t('signUp') }}</button>
        <div class="signUp" v-if="visibleUp">
            <div class="signUpContent">
                <span class="close" @click="closeForm">X</span>
                <div class="inputFields" @keyup.enter="createPerson">
                    <label for="nameUp">{{ $t('name') }}</label>
                    <input id="nameUp" :class="{error: classErrorName}" @keyup="startPrintingName" v-model="name" placeholder="Name">
                    <label for="emailUp">{{ $t('email') }}</label>
                    <input id="emailUp" :class="{error: classErrorEmail}" @keyup="startPrintingEmail" v-model="email" placeholder="your@yours.com">
                    <label for="passwordUp">{{ $t('password') }}</label>
                    <input id="passwordUp" :class="{error: classErrorPassword}" @keyup="startPrintingPassword" v-model="password">
                    <ul class="hint" v-if="classErrorPassword">
                        <li>{{ $t('passwordHint1') }}</li>
                        <li>{{ $t('passwordHint2') }}</li>
                        <li>{{ $t('passwordHint3') }}</li>
                    </ul>
                    <label for="passwordConfirm">{{ $t('passwordConfirm') }}</label>
                    <input id="passwordConfirm" :class="{error: classErrorPasswordConfirm}" @keyup="startPrintingPasswordConfirm" v-model="passwordConfirm">
                    <button class="submitBtn" @click="createPerson">{{ $t('submit') }}</button>
                </div>
            </div>
        </div>
        <button class="signInBtn" @click="visibleIn = true">{{ $t('signIn') }}</button>
        <div class="signIn" v-if="visibleIn">
            <div class="signInContent">
                <span class="close" @click="closeForm">X</span>
                <div class="inputFields">
                    <label for="nameIn">{{ $t('name') }}</label>
                    <input id="nameIn" v-model="name" type="text" placeholder="Name">
                    <label for="emailIn">{{ $t('email') }}</label>
                    <input id="emailIn" v-model="email" placeholder="your@yours.com">
                    <label for="passwordIn">{{ $t('password') }}</label>
                    <input id="passwordIn"  v-model="password">
                    <button class="submitBtn" @click="logPerson()">{{ $t('submit') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {signUpUser} from "../helpers/api";

    export default {
        name: "Header",
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
                classErrorEmail: false,
                classErrorPassword: false,
                classErrorPasswordConfirm: false
            }
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
                if(this.nameValidation(this.name) && this.emailValidation(this.email) && this.passwordValidation(this.password) && this.passwordConfirmFunc(this.password,this.passwordConfirm)) {
                    let person = {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                    };
                    signUpUser(person);
                    this.name = null;
                    this.email = null;
                    this.password = null;
                    this.passwordConfirm = null;
                    this.visibleUp = false;
                    alert("You've been successfully signed up!")
                } else {
                    if(!this.nameValidation(this.name) || this.name == null) this.classErrorName = true;
                    if(!this.emailValidation(this.email)) this.classErrorEmail = true;
                    if(!this.passwordValidation(this.password)) this.classErrorPassword = true;
                    if(!this.passwordConfirmFunc(this.password,this.passwordConfirm)) this.classErrorPasswordConfirm = true;
                }
            },
            emailValidation(email) {
                let regex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
                return regex.test(email);
            },
            nameValidation(name) {
                let regex = new RegExp('[A-Za-z]{3,19}$');
                return regex.test(name);
            },
            passwordValidation(password) {
                let regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
                return regex.test(password);
            },
            passwordConfirmFunc(password,confirm) {
                return password === confirm;
            },
            closeForm() {
                this.name = null;
                this.email = null;
                this.password = null;
                this.passwordConfirm = null;
                this.errors = [];
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
    .signUpBtn, .signInBtn, .submitBtn {
        margin: .5rem;
        padding: 1rem;
        border-radius: 1em;
        border: none;
        color: white;
        font-weight: bold;
        font-family: Arial;
        background-color: rgb(161, 15, 8);
        cursor: pointer;
    }
    .signUpBtn:hover, .signInBtn:hover, .submitBtn:hover{
        background-color: rgb(130, 10, 4);
        color: white;
    }
    .submitBtn {
        background-color: white;
        color: rgb(161, 15, 8);
        border: 3px solid rgb(161, 15, 8);
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
    input {
        margin: 1rem 0;
        border: none;
        border-bottom: 2px solid;
    }
    .error {
        border-color: red;
    }
</style>