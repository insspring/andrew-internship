<template>
    <div id="app">
        <Header></Header>
        <Loader v-if="flag"></Loader>
        <router-view class="router-view"></router-view>
    </div>
</template>

<script>
import Header from "./components/Header";
import { parseJwt } from "./helpers/parsingToken";
import Loader from "./components/Loader";
import {mapGetters} from 'vuex';

export default {
    components: {Loader, Header },
    created() {
        this.$store.dispatch('loadingProcess',true);
        if (localStorage.getItem("accessToken")) {
            this.$store.dispatch("setTokenData", {
                flag: true,
                token: localStorage.getItem("accessToken"),
                userData: parseJwt(localStorage.getItem("accessToken")),
                stop: true
            });
        }
    },
    computed: {
        ...mapGetters({
            flag: 'getFlag'
        })
    }
};
</script>

<style>
*{
    margin: 0;
    padding: 0;
    text-decoration: none;
    font-family: sans-serif;
    font-size: 14px;
}
body {
    display: flex;
    justify-content: center;
    background-color: rgb(65, 65, 65);
}
.router-view {
    margin-top: 7rem;
}
</style>
