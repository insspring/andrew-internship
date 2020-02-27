<template>
    <div class="main">
        <SubsMenu :userId="userId"></SubsMenu>
        <SubsFeed :subs="subs"></SubsFeed>
    </div>
</template>

<script>
    import SubsFeed from "./SubsFeed";
    import {mapGetters} from "vuex";
    import SubsMenu from "./SubsMenu";

    export default {
        name: "Subscribers",
        props: ['userId'],
        components: {SubsMenu, SubsFeed},
        computed: {
            ...mapGetters({
                users: 'getUsers',
            }),
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
        display: flex;
    }
</style>