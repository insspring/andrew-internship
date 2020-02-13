<template>
    <div id="app">
        <Header></Header>
        <router-view class="router-view"></router-view>
    </div>
</template>


<script>
    import Header from "./components/Header";
    import {parseJwt} from "./helpers/parsingToken";
    import {getUser} from "./helpers/api";

    export default {
        components: {Header},
        created() {
            if(localStorage.getItem('accessToken')) {
                this.$store.commit('flag',true);
                this.$store.commit('token',localStorage.getItem('accessToken'));
                this.$store.commit('userData', parseJwt(localStorage.getItem('accessToken')));
                getUser(this.$store.state.token).then(result => {
                    this.$store.commit('users',result.data);
                    let user = this.$store.state.users.find(item =>
                        item.email === Object.values(this.$store.state.userData)[0] && item.password === Object.values(this.$store.state.userData)[1]);
                    this.$store.commit('user',user);
                });
            }
        },
    }
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
        background-color: rgb(65,65,65);
    }
    .router-view {
        margin-top: 7rem;
    }

</style>