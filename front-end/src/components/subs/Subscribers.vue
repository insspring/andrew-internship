<template>
    <div class="main">
        <Loader></Loader>
        <SubsMenu :userId="userId"></SubsMenu>
        <SubsFeed :subs="subs"></SubsFeed>
    </div>
</template>

<script>
    import SubsFeed from "./SubsFeed";
    import SubsMenu from "./SubsMenu";
    import {getUser} from "../../helpers/api";
    import Loader from "../Loader";

    export default {
        name: "Subscribers",
        props: ['userId'],
        components: {Loader, SubsMenu, SubsFeed},
        data() {
            return {
                users: []
            }
        },
        created() {
            this.$store.dispatch('loadingProcess',true);
            getUser(this.$store.state.token).then(result => {
                this.users = result.data;
                this.$store.dispatch('loadingProcess',false);
            });
        },
        computed: {
            profile() {
                return this.users.find(item => item.id+'' === this.userId);
            },
            subs() {
                return this.users.filter(item => item.subscribes.find(item => item === this.profile.id));
            }
        },
    }
</script>

<style scoped>
    .main {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>