<template>
    <div class="subs">
        <div class="subs-menu">
            <div class="item">
                <router-link class="router-link" :to="'/user/' + userId + '/subscribers'">Subscribers</router-link>
            </div>
            <div class="item">
                <router-link class="router-link" :to="'/user/' + userId + '/subscriptions'">Subscriptions</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SubsMenu",
        props: {
            userId: String
        }
    }
</script>

<style scoped>
    .subs-menu {
        display: flex;
        flex-direction: column;
        width: 10rem;
    }
    .router-link {
        display: block;
        padding: 1rem;
        background-color: rgb(76, 76, 75);
        margin-bottom: 0.1rem;
        cursor: pointer;
        font-weight: bold;
        color: rgb(133, 133, 135);
    }
    .router-link:hover {
        background-color: rgb(56, 56, 55);
    }
    .router-link-exact-active {
        color: rgb(213, 213, 215);
    }
</style>