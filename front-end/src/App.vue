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
    import {getBooks} from "./helpers/api";

    export default {
        components: {Header},
        created() {
            if(localStorage.getItem('accessToken')) {
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