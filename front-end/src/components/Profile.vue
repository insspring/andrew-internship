<template>
    <div class="profile" v-if="profile">
        <Loader></Loader>
        <div class="main">
            <div class="profile-info">
                <div class="avatar">
                    <img v-if="!profile.avatar" class="avatar-photo" src="../assets/none.png.jpg"/>
                    <img v-if="profile.avatar" class="avatar-photo" :src="profile.avatar"/>
                </div>
                <div class="userData">
                    <div>
                        <div class="data">{{ $t('name') }}: {{ profile.name }}</div>
                        <div class="data">{{ $t('email') }}: {{ profile.email }}</div>
                    </div>
                    <div class="bar">
                        <div class="stats-li">
                            <router-link class="item" :to="'/user/'+ userId + '/books'">
                                <div class="header">{{ $t('books') }}</div>
                                <div class="content">{{ booksNum() }}</div>
                            </router-link>
                            <router-link class="item" :to="'/user/'+ userId + '/subscribers'">
                                <div class="header">Subscribers</div>
                                <div class="content">{{ subscribersNum }}</div>
                            </router-link>
                            <router-link class="item" :to="'/user/'+ userId + '/subscriptions'">
                                <div class="header">Subscriptions</div>
                                <div class="content">{{ subscriptionsNum }}</div>
                            </router-link>
                        </div>
                        <div v-if="userCheck">
                            <router-link class="router-link" to="/settings/profile">{{ $t('editProfile') }}</router-link>
                            <router-link class="router-link" to="/books/add">{{ $t('addBook') }}</router-link>
                        </div>
                        <ButtonTemplate v-if="!userCheck && !subscribeCheck"
                                        :text="'Subscribe'"
                                        :method="subscribe"
                        ></ButtonTemplate>
                        <ButtonTemplate v-if="!userCheck && subscribeCheck"
                                        :text="'Unsubscribe'"
                                        :method="unsubscribe"
                        ></ButtonTemplate>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {getBooks} from "../helpers/api";
    import {editUser} from "../helpers/api";
    import {parseJwt} from "../helpers/parsingToken";
    import {User} from "../helpers/constuctors";
    import ButtonTemplate from "./templates/ButtonTemplate";
    import Loader from "./Loader";

    export default {
        name: "Profile",
        components: {Loader, ButtonTemplate},
        props: ['userId'],
        data() {
            return {
                countBooks: 0,
                count: 0,
            }
        },
        created() {
            this.$store.dispatch('discardBooksFeed');
            this.$store.dispatch('loadingProcess', true);
        },
        computed: {
            ...mapGetters({
                users: 'getUsers',
                user: 'getUser',
            }),
            profile() {
                return this.users.find(item => item.id+'' === this.userId);
            },
            userCheck() {
                return this.user.id+'' === this.userId;
            },
            subscribeCheck() {
                return this.user.subscribes.find(item => item === this.profile.id);
            },
            subscriptionsNum() {
                return this.profile.subscribes.length;
            },
            subscribersNum() {
                return this.users.filter(item => item.subscribes.find(item => item === this.profile.id)).length;
            },
        },
        methods: {
            booksNum() {
                getBooks(this.$store.state.token,this.profile.id).then(result => {
                    this.countBooks = result.headers["x-total-count"];
                    this.$store.dispatch('loadingProcess', false);
                });
                return this.countBooks;
            },
            subscribe() {
                let user = new User(this.user.name,this.user.email,this.user.password,this.user.avatar,this.user.subscribes,this.user.id);
                user.addSubscription(this.profile.id);
                editUser(this.user.id, user).then(() => {
                    this.$store.dispatch('setTokenData', {
                        flag: true,
                        token: localStorage.getItem('accessToken'),
                        userData: parseJwt(localStorage.getItem('accessToken')),
                        stop: true
                    });
                    alert('Subscribed!');
                });
            },
            unsubscribe() {
                editUser(this.user.id,
                    new User(this.user.name,this.user.email,this.user.password,this.user.avatar,this.user.subscribes.filter(item => item !== this.profile.id),this.user.id)
                ).then(() => {
                    this.$store.dispatch('setTokenData', {
                        flag: true,
                        token: localStorage.getItem('accessToken'),
                        userData: parseJwt(localStorage.getItem('accessToken')),
                        stop: true
                    });
                    alert('Unsubscribed!');
                });
            },
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
    .main {
        border-radius: 1rem;
        box-shadow: 0 0 1rem .1rem rgb(45, 45, 45);
        padding: 1rem;
        background-color: rgb(76, 76, 75);
    }
    .profile-info {
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
        cursor: pointer;
        font-weight: bold;
        color: rgb(193, 193, 195);
    }
    .item:hover {
        color: rgb(213, 213, 215);
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