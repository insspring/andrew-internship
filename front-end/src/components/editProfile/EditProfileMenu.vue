<template>
    <div class="edit">
        <div class="settings-menu">
            <div class="item">
                <router-link class="router-link" to="/settings/profile">{{ $t('profile') }}</router-link>
            </div>
            <div class="item">
                <router-link class="router-link" to="/settings/email">{{ $t('email') }}</router-link>
            </div>
            <div class="item">
                <router-link class="router-link" to="/settings/password">{{ $t('password') }}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditProfileMenu"
    }
</script>

<style scoped>
    .edit {

    }
    .settings-menu {
        display: flex;
        flex-direction: column;
        width: 10rem;
    }
    .router-link {
        display: block;
        padding: 1rem;
        background-color: rgb(76, 76, 75);
        margin-bottom: .1rem;
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