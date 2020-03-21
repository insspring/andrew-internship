<template>
    <div class="main">
        <SubsMenu :userId="userId"></SubsMenu>
        <SubsFeed :subs="subs"></SubsFeed>
    </div>
</template>

<script>
    import SubsFeed from "./SubsFeed";
    import SubsMenu from "./SubsMenu";
    import {mapGetters} from "vuex";
    import {getUser} from "../../helpers/api";

    export default {
        name: "Subscriptions",
        props: ['userId'],
        components: {SubsFeed, SubsMenu},
        data() {
            return {
                users: []
            }
        },
        created() {
            getUser(this.$store.state.token).then(result => {
                this.users = result.data;
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