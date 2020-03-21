<template>
    <div class="subs">
        <div class="subs-menu">
            <div class="item">
                <router-link class="router-link" :to="'/user/' + userId + '/subscribers'">{{ $t('subscribers') }}</router-link>
            </div>
            <div class="item">
                <router-link class="router-link" :to="'/user/' + userId + '/subscriptions'">{{ $t('subscriptions') }}</router-link>
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
        position: fixed;
        left: calc(50% - 11rem);
        display: flex;
        flex-direction: column;
    }
    .router-link {
        display: block;
        padding: .6rem;
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