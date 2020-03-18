<template>
    <div class="book-page" v-if="book.description && user">
        <div class="book">
            <div class="cover">
                <img class="bookCover" :src="book.bookCover">
                <Rating
                        :book="book"
                        :bookPage="true"
                        @setRate="setBookRate"
                ></Rating>
            </div>
            <div class="desc">
                <div class="header">
                    <div class="item name">{{ book.name }}</div>
                    <div class="buttons">
                        <router-link v-if="checkUser" class="btn router-link" :to="'/book/' + book.id + '/edit'">Edit</router-link>
                        <ButtonTemplate
                                class="btn"
                                v-if="checkUser"
                                :text="'Delete'"
                                :params="[book]"
                                :method="deleteBook"
                        ></ButtonTemplate>
                        <ButtonTemplate
                                v-if="!checkUser && !favoritesCheck"
                                class="btn"
                                :text="'Add to favorites'"
                                :method="debouncedToFavorites"
                        ></ButtonTemplate>
                        <ButtonTemplate
                                v-if="!checkUser && favoritesCheck"
                                class="btn"
                                :text="'Remove from favorites'"
                                :method="debouncedFromFavorites"
                        ></ButtonTemplate>
                    </div>
                </div>
                <div class="item author">
                    {{ $t('author') }}:
                    <router-link class="linkToProfile" :to="'/user/' + book.authorId" v-if="author">{{ author.name }}</router-link>
                </div>
                <div class="item description">
                    <span v-if="!readMoreActivated">{{ book.description.slice(0,200) }}</span>
                       <a class="readMore" v-if="!readMoreActivated && checkLength" @click.prevent="activateReadMore(book.id)" href="#">  (Read more...)</a>
                    <span v-if="readMoreActivated">{{ book.description }}</span>
                    <a class="readMore" v-if="readMoreActivated && checkLength" @click.prevent="deactivateReadMore" href="#">  (...less)</a>
                </div>
                <div class="date">
                    <div class="item date">{{ $t('uploaded') }}: {{ book.publicationDate }}</div>
                    <div class="item date" v-if="book.updateDate">{{ $t('updated') }}: {{ book.updateDate }}</div>
                    <div class="hashtags" v-for="hashtag in book.hashtags" :key="hashtag">
                        <router-link v-if="hashtag" class="hashtag" :to="{ name: 'searched', params: {hashtag} }">#{{ hashtag }}</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="showCommentsBtn">
            <ButtonTemplate
                    v-if="!showCommentsToggle"
                    class="btn"
                    :text="'Show comments'"
                    :method="showComments"
            ></ButtonTemplate>
            <ButtonTemplate
                    v-else
                    class="btn"
                    :text="'Hide comments'"
                    :method="showComments"
            ></ButtonTemplate>
        </div>
        <Comments v-if="showCommentsToggle"
                :book="book"
        ></Comments>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {getBook} from "../../helpers/api";
    import {getUser} from "../../helpers/api";
    import {editBook} from "../../helpers/api";
    import {deleteBook} from "../../helpers/api";
    import {Book} from "../../helpers/constuctors";
    import ButtonTemplate from "../templates/ButtonTemplate";
    import Rating from "../Rating";
    import Comments from "../Comments/Comments";
    import _ from 'lodash';

    export default {
        name: "BookPage",
        components: {Comments, Rating, ButtonTemplate},
        props: ['bookId'],
        data() {
            return {
                readMoreActivated: null,
                book: {},
                users: [],
                showCommentsToggle: false
            }
        },
        created() {
            this.$store.dispatch('loadingProcess',true);
            getBook(this.$store.state.token,this.bookId).then(result => {
                this.book = result.data[0];
                this.$store.dispatch('loadingProcess',false);
            });
            getUser(this.$store.state.token).then(result => {
                this.users = result.data;
            });
            this.$store.dispatch('discardBooksFeed');
            this.debouncedToFavorites = _.debounce(this.toFavorites, 500);
            this.debouncedFromFavorites = _.debounce(this.fromFavorites, 500);
        },
        computed: {
            ...mapGetters({
                user: 'getUser'
            }),
            author() {
                return this.users.find(item => item.id === this.book.authorId);
            },
            checkLength() {
                return this.book.description.slice(200).length > 0;
            },
            checkUser() {
                return this.user.id === this.book.authorId;
            },
            favoritesCheck() {
                return this.book.favorites ? this.book.favorites.find(item => item === this.user.id) : null;
            },
        },
        watch: {
            bookId(bookId) {
                getBook(this.$store.state.token, bookId).then(result => {
                    this.book = result.data[0];
                    this.$store.dispatch('loadingProcess',false);
                });
            }
        },
        methods: {
            showComments() {
                this.showCommentsToggle = !this.showCommentsToggle;
            },
            activateReadMore(id) {
                this.readMoreActivated = id;
            },
            deactivateReadMore() {
                this.readMoreActivated = null;
            },
            toFavorites() {
                let book = new Book({
                    name: this.book.name,
                    description: this.book.description,
                    author: this.book.author,
                    authorId: this.book.authorId,
                    bookCover: this.book.bookCover,
                    hashtags: this.hashtags,
                    publicationDate: this.book.publicationDate,
                    updateDate: this.book.updateDate,
                    favorites: this.book.favorites,
                    rating: this.book.rating,
                    id: this.book.id
                });
                book.addToFavorites(this.user.id);
                editBook(this.book.id, book).then(() => {
                    getBook(this.$store.state.token,this.bookId).then(result => {
                        this.book = result.data[0];
                    });
                });
            },
            fromFavorites() {
                editBook(this.book.id, new Book({
                    name: this.book.name,
                    description: this.book.description,
                    author: this.book.author,
                    authorId: this.book.authorId,
                    bookCover: this.book.bookCover,
                    hashtags: this.hashtags,
                    publicationDate: this.book.publicationDate,
                    updateDate: this.book.updateDate,
                    favorites: this.book.favorites.filter(item => item !== this.user.id),
                    rating: this.book.rating,
                    id: this.book.id
                })).then(() => {
                    getBook(this.$store.state.token,this.bookId).then(result => {
                        this.book = result.data[0];
                    });
                });
            },
            setBookRate(book) {
                editBook(this.book.id, book).then(() => {
                    getBook(this.$store.state.token,this.book.id).then(result => {
                        this.book = result.data[0];
                    });
                });
            },
            deleteBook(book) {
                deleteBook(book.id).then(() => {
                    alert('Book deleted!');
                    this.$router.push({path: '/'});
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import "../../scss/mixins";
    @import "../../scss/_variables";

    .book-page {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .book {
        display: flex;
        padding: 2rem;
        max-width: 70rem;
        margin-right: 1rem;
        margin-left: 1rem;
        border-radius: 2rem;
        color: rgb(193,193,195);
        background-color: rgb(77, 81, 80);
        box-shadow: 0 0 .7rem .1rem rgb(50,50,50);
    }
    .desc {
        flex-direction: column;
        justify-content: space-between;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        -ms-hyphens: auto;
    }
    .bookCover {
        margin-right: 1rem;
        width: 10rem;
        height: 16rem;
        border: 2px solid rgb(52, 56, 55);
        box-shadow: 0 0 .7rem .1rem rgb(60,60,60);

        @include for-size (phone-only) {
            width: 8rem;
            height: 12rem;
        }
    }
    .rating {
        display: flex;
    }
    .author {
        font-size: 1.5rem;
        color: rgb(193,193,195);

        @include for-size (phone-only) {
            font-size: 1.2rem;
        }
    }
    .item {
        margin: 1rem 0;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @include for-size (phone-only) {
            flex-direction: column-reverse;
        }
    }
    .buttons {
        display: flex;
    }
    .btn {
        background-color: transparent;
        border: 1px solid transparent;

        @include for-size (phone-only) {
            padding: .2rem;
        }
    }
    .btn:hover {
        color: $orange-color;
    }
    .name {
        margin: 0;
        font-size: 2rem;
        font-weight: bold;
        color: $orange-color;

        @include for-size (phone-only) {
            font-size: 1.5rem;
        }
    }
    .date {
        margin: .2rem 0;

        @include for-size(phone-only) {
            font-size: .8rem;
        }
    }
    .showCommentsBtn {
        display: flex;
        justify-content: center;
    }
    .linkToProfile{

        @extend .author;
    }
    .linkToProfile:hover {
        color: rgb(233,233,235);
    }
    .hashtag {
        color: $orange-color;
    }
    .hashtag:hover {
        text-decoration: underline;
    }
    .readMore {
        color: rgb(122, 126, 125);
    }
    .readMore:hover {
        color: rgb(192, 196, 195);
    }
    .router-link {
        display: block;
        padding: .6rem .8rem .6rem .8rem;
        width: 2rem;
        border-radius: .5rem;
        font-weight: bold;
        cursor: pointer;
        color: rgb(203, 203, 205);
    }
    .router-link:hover {
        color: $orange-color;
    }
</style>