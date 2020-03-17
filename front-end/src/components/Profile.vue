<template>
    <div class="component">
        <div class="profile" v-if="profile">
            <div class="main">
                <div class="profile-info">
                    <div class="avatar">
                        <img v-if="!profile.avatar" class="avatar-photo" src="../assets/none.png.jpg"/>
                        <img v-if="profile.avatar" class="avatar-photo" :src="profile.avatar"/>
                        <router-link v-if="userCheck" class="router-link" to="/books/add">{{ $t('addBook') }}</router-link>
                    </div>
                    <div class="userData">
                        <div>
                            <div class="userData-header">
                                <div class="data name">{{ profile.name }}</div>
                                <div class="buttons">
                                    <router-link v-if="userCheck" class="router-link" to="/settings/profile">{{ $t('editProfile') }}</router-link>
                                    <ButtonTemplate v-if="!userCheck && !subscribeCheck"
                                                    class="btn-submit"
                                                    :text="'Subscribe'"
                                                    :method="debouncedSuscribe"
                                    ></ButtonTemplate>
                                    <ButtonTemplate v-if="!userCheck && subscribeCheck"
                                                    class="btn-submit"
                                                    :text="'Unsubscribe'"
                                                    :method="debouncedUnsuscribe"
                                    ></ButtonTemplate>
                                </div>
                            </div>
                            <div class="data email">{{ $t('email') }}: {{ profile.email }}</div>
                        </div>
                        <div class="bar">
                            <div class="stats-li">
                                <router-link class="item" :to="'/user/'+ userId + '/books'">
                                    <div class="header">{{ $t('books') }}</div>
                                    <div class="content">{{ countBooks }}</div>
                                </router-link>
                                <router-link class="item" :to="'/user/'+ userId + '/subscribers'">
                                    <div class="header">{{ $t('subscribers') }}</div>
                                    <div class="content">{{ subscribersNum }}</div>
                                </router-link>
                                <router-link class="item" :to="'/user/'+ userId + '/subscriptions'">
                                    <div class="header">{{ $t('subscriptions') }}</div>
                                    <div class="content">{{ subscriptionsNum }}</div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="books" v-if="books.length">
            <p class="books-header">Recently added books:</p>
            <BooksFeed
                    :books="books"
                    :loadMore="loadMore"
                    :userBooks="true"
                    :recentBooks="true"
            ></BooksFeed>
        </div>
    </div>
</template>

<script>
    import {getRecentBooks} from "../helpers/api";
    import {editUser} from "../helpers/api";
    import {parseJwt} from "../helpers/parsingToken";
    import {getUser} from "../helpers/api";
    import {User} from "../helpers/constuctors";
    import ButtonTemplate from "./templates/ButtonTemplate";
    import _ from 'lodash';
    import BooksFeed from "./books/BooksFeed";

    export default {
        name: "Profile",
        components: {BooksFeed, ButtonTemplate},
        props: ['userId'],
        data() {
            return {
                countBooks: 0,
                count: 0,
                users: [],
                user: {},
                books: [],
            }
        },
        created() {
            this.$store.dispatch('discardBooksFeed');
            getUser(this.$store.state.token).then(result => {
                this.users = result.data;
                this.user = result.data.find(item =>
                    item.email === Object.values(this.$store.state.userData)[0] && item.password === Object.values(this.$store.state.userData)[1]);
            });
            this.debouncedSuscribe = _.debounce(this.subscribe, 500);
            this.debouncedUnsuscribe = _.debounce(this.unsubscribe, 500);
        },
        computed: {
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
        watch: {
            profile() {
                this.books = [];
                this.loadMore();
            }
        },
        methods: {
            loadMore() {
                this.$store.dispatch('loadingProcess', true);
                getRecentBooks(this.$store.state.token, this.userId).then(result => {
                    this.countBooks = result.headers["x-total-count"];
                    this.books.push(...result.data);
                    this.$store.dispatch('loadingProcess', false);
                });
                return this.countBooks;
            },
            subscribe() {
                let user = new User({
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    avatar: this.user.avatar,
                    subscribes: this.subscribes,
                    id: this.user.id
                });
                user.addSubscription(this.profile.id);
                editUser(this.user.id, user).then(() => {
                    this.$store.dispatch('setTokenData', {
                        flag: true,
                        token: localStorage.getItem('accessToken'),
                        userData: parseJwt(localStorage.getItem('accessToken')),
                        stop: true
                    });
                    getUser(this.$store.state.token).then(result => {
                        this.users = result.data;
                        this.user = result.data.find(item =>
                            item.email === Object.values(this.$store.state.userData)[0] && item.password === Object.values(this.$store.state.userData)[1]);
                    });
                });
            },
            unsubscribe() {
                editUser(this.user.id,
                    new User({
                        name: this.user.name,
                        email: this.user.email,
                        password: this.user.password,
                        avatar: this.user.avatar,
                        subscribes: this.user.subscribes.filter(item => item !== this.profile.id),
                        id: this.user.id
                    })
                ).then(() => {
                    this.$store.dispatch('setTokenData', {
                        flag: true,
                        token: localStorage.getItem('accessToken'),
                        userData: parseJwt(localStorage.getItem('accessToken')),
                        stop: true
                    });
                    getUser(this.$store.state.token).then(result => {
                        this.users = result.data;
                        this.user = result.data.find(item =>
                            item.email === Object.values(this.$store.state.userData)[0] && item.password === Object.values(this.$store.state.userData)[1]);
                    });
                });
            },
        }
    }
</script>

<style lang="scss" scoped>

    @import "../scss/mixins";
    @import "../scss/variables";

    .profile {
        margin-right: .5rem;
        margin-left: .5rem;
        margin-bottom: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: rgb(175,175,175);
    }
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 1rem;
        box-shadow: 0 0 1rem .1rem rgb(45, 45, 45);
        padding: 1rem;
        background-color: rgb(76, 76, 75);

        @include for-size(phone-only) {
            padding: .5rem;
        }
    }
    .profile-info {
        display: flex;
    }
    .avatar {
        text-align: center;
        padding: 1rem;
        min-width: 8rem;
        width: 8rem;

        @include for-size(tablet-landscape-up) {
            min-width: 6rem;
            width: 6rem;
        }
        @include for-size(phone-only) {
            padding: .4rem;
            min-width: 5rem;
            width: 5rem;
        }
    }
    .avatar-photo {
        width: 100%;
        border-radius: 50%;
    }
    .bar {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1rem;
    }
    .stats-li {
        display: flex;
    }
    .item {
        margin-right: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        font-weight: bold;
        color: $wick-white;

        @include for-size(phone-only) {
            font-size: 1rem;
        }
    }
    .item:hover {
        color: $white-hover;
    }
    .userData {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        @include for-size(phone-only) {
            align-items: center;
        }
    }
    .userData-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .data {
        margin-top: .5rem;
    }
    .name {
        white-space: nowrap;
        font-size: 1.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 300;
        margin-right: 1rem;

        @include for-size(phone-only) {
            font-size: 1.2rem;
        }
    }
    .email {
        font-size: 1.2rem;

        @include for-size(phone-only) {
            font-size: 1rem;
        }
    }
    .router-link {

        @extend .email;

        white-space: pre;
        display: block;
        color: $classic-white;
        font-weight: bold;
        cursor: pointer;
        border: none;
        text-align: center;

        @include for-size(phone-only) {
            white-space: normal;
        }
    }
    .router-link:hover {
        color: $orange-color;
    }
    .header,.content {
        font-size: 1.2rem;

        @include for-size(phone-only) {
            font-size: .8rem;
        }
    }
    .books-header {
        text-align: center;
        color: $classic-white;
        @extend .name;
    }
</style>