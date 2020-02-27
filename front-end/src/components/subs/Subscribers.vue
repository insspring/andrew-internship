<template>
    <div class="main">
        <SubsMenu :userId="userId"></SubsMenu>
        <SubsFeed :subs="subs"></SubsFeed>
    </div>
</template>

<script>
    import SubsFeed from "./SubsFeed";
    import SubsMenu from "./SubsMenu";
    import {getUser} from "../../helpers/api";

    export default {
        name: "Subscribers",
        props: ['userId'],
        components: {SubsMenu, SubsFeed},
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