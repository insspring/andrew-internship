<template>
    <router-link v-if="flag" class="profile" :to="'/user/' + user.id">
        <img v-if="!user.avatar" class="avatar-photo" src="../assets/none.png.jpg"/>
        <img v-if="user.avatar" class="avatar-photo" :src="user.avatar"/>
        <div class="data">{{ user.name }}</div>
    </router-link>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "UserMiniature",
        props: {
            user: Object
        },
        computed: {
            ...mapGetters({
                flag: 'getFlag'
            })
        }
    }
</script>

<style scoped>
    .avatar-photo {
        width: 2rem;
        border-radius: 50%;
        padding: .5rem;
    }
    .profile {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-weight: bold;
        color: rgb(193, 193, 195);
        margin-right: 1rem;
    }
    .profile:hover {
        color: rgb(243, 243, 245);
    }
</style>