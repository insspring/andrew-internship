<template>
    <div class="main" v-if="profile">
        <SubsMenu :userId="userId"></SubsMenu>
        <SubsFeed :subs="subs"></SubsFeed>
    </div>
</template>

<script>
    import SubsFeed from "./SubsFeed";
    import SubsMenu from "./SubsMenu";
    import {mapGetters} from "vuex";

    export default {
        name: "Subscriptions",
        props: ['userId'],
        components: {SubsFeed, SubsMenu},
        computed: {
            ...mapGetters({
                user: 'getUser',
                users: 'getUsers'
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
        display: flex;
    }
</style>