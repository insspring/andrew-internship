<template>
    <div>
        <div class="list">
            <UserMiniature v-for="sub in subs" :user="sub" :key="sub.id"></UserMiniature>
        </div>
    </div>
</template>

<script>

    import UserMiniature from "../UserMiniature";
    export default {
        name: "SubsFeed",
        components: {UserMiniature},
        props: {
            subs: Array,
        },
    }
</script>

<style lang="scss" scoped>

    @import "../../scss/mixins";
    @import "../../scss/variables";

    .list {
        margin-left: 1rem;
    }
</style>