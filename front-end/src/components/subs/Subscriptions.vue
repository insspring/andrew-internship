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
    import {mapGetters} from "vuex";
    import {getUser} from "../../helpers/api";
    import Loader from "../Loader";

    export default {
        name: "Subscriptions",
        props: ['userId'],
        components: {Loader, SubsFeed, SubsMenu},
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
            ...mapGetters({
                user: 'getUser',
            }),
            profile() {
                return this.users.find(item => item.id+'' === this.userId);
            },
            subs() {
                return this.users.filter(item => this.profile.subscribes.find(x => x === item.id));
            },
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