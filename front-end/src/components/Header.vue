<template>
    <div class="header">
        <div class="logo">
            <img class="logo__img" src="../assets/logo.png">
        </div>
        <SignUpIn></SignUpIn>
        <div class="menu burgerMenu" :class="{ active: opened }">
            <div class="menu-content burgerMenuContent">
                <router-link class="router-link" to="/">{{ $t('home') }}</router-link>
                <ButtonTemplate
                        class="btn-menu"
                        v-if="!flag"
                        :text="$t('signUp')"
                        :method="visibleUpFunc"
                ></ButtonTemplate>
                <ButtonTemplate
                        class="btn-menu"
                        v-if="!flag"
                        :text="$t('signIn')"
                        :method="visibleInFunc"
                ></ButtonTemplate>
                <ButtonTemplate
                        class="btn-menu"
                        v-if="flag"
                        :text="$t('signOut')"
                        :method="deleteToken"
                ></ButtonTemplate>
                <LocaleChange></LocaleChange>
                <router-link v-if="flag" class="profile" to="/profile">
                    <img class="avatar-photo" :src="user.avatar"/>
                    <div class="data">{{ user.name }}</div>
                </router-link>
            </div>
        </div>
        <div class="menu-btn" @click="openMenu" :class="{ change: opened }"></div>

    </div>
</template>

<script>
    import ButtonTemplate from "./ButtonTemplate";
    import LocaleChange from "./LocaleChange";
    import SignUpIn from "./SignUpIn";

    export default {
        name: "Header",
        components: {SignUpIn, LocaleChange, ButtonTemplate},
        data() {
            return {
                opened: false,
            }
        },
        computed: {
            flag() {
                return this.$store.state.flag;
            },
            user() {
                return this.$store.getters.setUser;
            },
        },
        methods: {
            openMenu() {
                this.opened = !this.opened;
            },
            visibleInFunc() {
                this.$store.commit('visibleIn',true);
            },
            visibleUpFunc() {
                this.$store.commit('visibleUp',true);
            },

            deleteToken() {
                localStorage.removeItem('accessToken');
                this.$store.commit('flag',false);
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
        color: rgb(133, 133, 135);
        border: 2px solid rgb(63, 63, 65);

        @include for-size(phone-only) {
            width: 100%;
            display: block;
            margin-left: .6rem;
            border-radius: .1rem;
            border: 1px solid rgb(43, 43, 45);
            background-color: transparent;
            text-align: center;
            font-weight: bold;
            padding: 1rem;
            cursor: pointer;
            color: rgb(133, 133, 135);
        }
    }
    .router-link:hover {
        background-color: rgb(36, 36, 35);
        color: rgb(213, 213, 215);
    }
    .router-link-exact-active {
        color: rgb(213, 213, 215);
    }
    .avatar-photo {
        width: 2rem;
        border-radius: 2rem;
        padding: .5rem;
    }
    .profile {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-weight: bold;
        color: rgb(193, 193, 195);
        margin-right: 1rem;
    }
    .profile:hover {
        color: rgb(213, 213, 215);
    }
</style>