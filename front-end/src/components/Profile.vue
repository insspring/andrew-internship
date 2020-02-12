<template>
    <div class="profile">
        <div class="main-info">
            <div class="avatar">
                <img class="avatar-photo" src="../assets/none.png.jpg"/>
            </div>
            <div class="userData">
                <div>
                    <div class="data">{{ $t('name') }}: {{ person.name }}</div>
                    <div class="data">{{ $t('email') }}: {{ person.email }}</div>
                </div>
                <div class="bar">
                    <div class="stats-li">
                        <div class="item">
                            <div class="header">Books</div>
                            <div class="content">0</div>
                        </div>
                        <div class="item">
                            <div class="header">Followers</div>
                            <div class="content">0</div>
                        </div>
                        <div class="item">
                            <div class="header">Followed</div>
                            <div class="content">0</div>
                        </div>
                    </div>
                    <div>
                        <router-link class="router-link" to="/settings/profile">{{ $t('editProfile') }}</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Profile",
        computed: {
            person() {
                return this.$store.state.person;
            }
        }
    }
</script>

<style scoped>
    .profile {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: rgb(175,175,175);
    }
    .main-info {
        border-radius: 1rem;
        box-shadow: 0 0 1rem .1rem rgb(45, 45, 45);
        padding: 1rem;
        background-color: rgb(76, 76, 75);
        display: flex;
    }
    .avatar {
        padding: 1rem;
        width: 7rem;
    }
    .avatar-photo {
        width: 100%;
        border-radius: 5rem;
    }
    .bar {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1rem;
    }
    .stats-li {
        display: flex;
        flex-wrap: wrap;
    }
    .item {
        margin-right: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .userData {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .data {
        margin-top: .5rem;
    }
    .router-link {
        display: block;
        padding: .6rem .8rem .6rem .8rem;
        border-radius: .5rem;
        font-weight: bold;
        cursor: pointer;
        background-color: rgb(96, 96, 95);
        color: rgb(203, 203, 205);
        border: 2px solid rgb(63, 63, 65);
    }
    .router-link:hover {
        background-color: rgb(66, 66, 65);
    }
</style>