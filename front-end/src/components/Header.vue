<template>
    <div class="header">
        <router-link to="/">
            <div class="logo">
                <img v-if="windowWidth > 500" class="logo__img" src="../assets/logo.png">
                <img class="logo__img" v-else src="../assets/logo-mini.png">
            </div>
        </router-link>
        <SignUpIn></SignUpIn>
        <SearchBar v-if="flag"></SearchBar>
        <div id="menu">
            <div id="background" class="burgerMenu" :class="{ active: opened }">
                <div class="menu-content burgerMenuContent">
                    <router-link class="router-link" to="/">
                        <span @click="closeMenu">{{ $t('home') }}</span>
                    </router-link>
                    <ButtonTemplate
                            class="btn-menu"
                            v-if="!flag"
                            :text="$t('signUp')"
                            :method="visibleUp"
                    ></ButtonTemplate>
                    <ButtonTemplate
                            class="btn-menu"
                            v-if="!flag"
                            :text="$t('signIn')"
                            :method="visibleIn"
                    ></ButtonTemplate>
                    <ButtonTemplate
                            class="btn-menu"
                            v-if="flag"
                            :text="$t('signOut')"
                            :method="deleteToken"
                    ></ButtonTemplate>
                    <LocaleChange></LocaleChange>
                    <router-link v-if="flag" class="router-link" to="/favorites">
                        <span @click="closeMenu">{{ $t('favorites') }}</span>
                    </router-link>
                    <UserMiniature
                            :user="user"
                    ></UserMiniature>
                </div>
            </div>
            <div class="menu-btn" @click="openMenu" :class="{ change: opened }"></div>
        </div>
    </div>
</template>

<script>
    import ButtonTemplate from "./templates/ButtonTemplate";
    import LocaleChange from "./templates/LocaleChange";
    import SignUpIn from "./SignUpIn";
    import {mapGetters} from "vuex";
    import UserMiniature from "./UserMiniature";
    import SearchBar from "./SearchBar";

    export default {
        name: "Header",
        components: {SearchBar, UserMiniature, SignUpIn, LocaleChange, ButtonTemplate},
        data() {
            return {
                opened: false,
                windowWidth: window.innerWidth,
            }
        },
        computed: {
            ...mapGetters({
                flag: 'getFlag',
                user: 'getUser',
                loading: 'getLoading'
            }),
        },
        created() {
            this.clickedOutside();
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
        },
        methods: {
            openMenu() {
                this.opened = !this.opened;
            },
            closeMenu() {
                this.opened = false;
            },
            clickedOutside() {
                document.addEventListener("click", (evt) => {
                    const backgroundElement = document.getElementById("background");
                    let targetElement = evt.target;
                    if(targetElement === backgroundElement) {
                        this.opened = false;
                    }
                });
            },
            visibleIn() {
                this.opened = false;
                this.$store.dispatch('visibleIn',true);
            },
            visibleUp() {
                this.opened = false;
                this.$store.dispatch('visibleUp',true);
            },
            deleteToken() {
                this.opened = false;
                localStorage.removeItem('accessToken');
                this.$store.dispatch('setFlag',false);
                this.$store.dispatch('discardBooksFeed');
                this.$router.push({path: '/'});
            },


        }
    }
</script>

<style lang="scss" scoped>

    @import '../scss/mixins.scss';
    @import "../scss/variables";
    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 5rem;
        background-color: rgb(36, 36, 35);
        box-shadow: 0 .1rem 1rem .1rem rgb(36, 36, 35);

        @include for-size (tablet-landscape-up) {
            justify-content: space-around;
        }
    }

    .logo {
        padding: 1rem;
        width: 16rem;
        min-width: 16rem;

        @include for-size (tablet-landscape-up) {
            padding: 0;
            width: 12rem;
            min-width: 12rem;
        }
        @include for-size (phone-only) {
            padding: 0;
            width: 4rem;
            min-width: 4rem;
        }
    }
    .logo__img {
        width: 100%;
    }

    .menu-btn {
        display: none;
        margin: 1rem;
        width: 2rem;
        cursor: pointer;
        min-width: 1.5rem;

        @include for-size (tablet-landscape-up) {
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
    .menu-content {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .burgerMenu {

        @include for-size (tablet-landscape-up) {
            display: none;
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: 2;
            top: 0;
            right: 0;
            background-color: rgba(0,0,0,0.3);
            overflow: hidden;
            transition: 1s;
        }
    }
    .burgerMenuContent {

        @include for-size (tablet-landscape-up) {
            float: right;
            margin-top: 5rem;
            height: 100%;
            width: 16rem;
            background-color: rgb(36, 36, 35);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }
    }
    .active {

        @include for-size (tablet-landscape-up) {
            display: block;
        }
    }
    .router-link {
        box-sizing: border-box;
        margin-right: .5rem;
        padding: .6rem .8rem .6rem .8rem;
        border-radius: .5rem;
        font-weight: bold;
        cursor: pointer;
        background-color: rgb(46, 46, 45);
        color: rgb(193, 193, 195);
        border: 2px solid rgb(63, 63, 65);

        @include for-size(tablet-landscape-up) {
            width: 100%;
            display: block;
            margin-left: .6rem;
            border: none;
            background-color: transparent;
            text-align: center;
            font-weight: bold;
            padding: 1rem;
            cursor: pointer;
            color: rgb(193, 193, 195);
            box-sizing: border-box;
        }
    }
    .router-link:hover {
        background-color: rgb(36, 36, 35);
        color: $white-hover;
    }
    .router-link-exact-active {
        color: rgb(213, 213, 215);
    }
    .btn-menu {
        margin-right: .5rem;

        @include for-size(tablet-landscape-up) {
            margin: 0;
        }
    }
</style>