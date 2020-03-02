<template>
    <div class="component">
        <Loader v-if="flag"></Loader>
        <ul class="library">
            <li class="book" v-for="book in books" :key="book.id">
                <div class="book-body">
                    <img class="bookCover" :src="book.bookCover">
                    <div class="desc">
                        <div class="item name">{{ book.name }}</div>
                        <div v-if="!userBooks" class="item author">
                            {{ $t('author') }}:
                            <router-link class="linkToProfile" :to="'/user/' + book.authorId">{{ book.author }}</router-link>
                        </div>
                        <div class="item description">
                            <span>{{ book.description.slice(0,150) }}</span>
                            <router-link class="router-link" :to="'/book/' + book.id">(Read more...)</router-link>
                        </div>
                    </div>
                </div>
                <Rating
                        :book="book"
                        :bookPage="false"
                ></Rating>
                <div class="book-footer">
                    <div class="date">{{ $t('uploaded') }}: {{ book.publicationDate }}</div>
                    <div class="date" v-if="book.updateDate">{{ $t('updated') }}: {{ book.updateDate }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import Loader from "../Loader";
    import {mapGetters} from "vuex";
    import Rating from "../Rating";

    export default {
        name: "BooksFeed",
        props: {
            loadMore: Function,
            books: Array,
            userBooks: Boolean
        },
        components: {Rating, Loader},
        data() {
            return {
                bottom: false,
            }
        },
        created() {
            window.addEventListener('scroll', () => {
                this.bottom = this.bottomVisible()
            });
            this.loadMore();
        },
        watch: {
            bottom(bottom) {
                if (bottom) {
                    this.loadMore();
                }
            }
        },
        computed: {
            ...mapGetters({
                user: 'getUser',
                flag: 'getFlag'
            }),
        },
        methods: {
            bottomVisible() {
                return window.pageYOffset + window.innerHeight + 100 >= document.documentElement.offsetHeight;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../scss/mixins';

    .library {
        display: flex;
        flex-wrap: wrap;

        @include for-size (phone-only) {
            justify-content: center;
            margin: 0;
        }
    }
    .book {
        width: 20rem;
        margin: .7rem;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 2rem;
        color: rgb(193,193,195);
        background-color: rgb(77, 81, 80);
        box-shadow: 0 0 .7rem .1rem rgb(50,50,50);
    }
    .book-body {
        display: flex;
    }
    .desc {
        box-sizing: border-box;
        flex-direction: column;
    }
    .bookCover {
        margin-right: 1rem;
        width: 10rem;
        height: 16rem;
        border: 2px solid rgb(52, 56, 55);
        box-shadow: 0 0 .7rem .1rem rgb(60,60,60);
    }
    .book-footer {
        margin-top: .5rem;
    }
    .item {
        margin: 1rem 0;
    }
    .name {
        margin: 0;
        font-size: 2rem;
        font-weight: bold;
        color: rgb(212, 126, 15);
    }
    .author {
        font-size: 1.5rem;
        color: rgb(193,193,195);
    }
    .linkToProfile{

        @extend .author;
    }
    .linkToProfile:hover {
        color: rgb(233,233,235);
    }
    .date {
        margin-top: .1rem;
        font-size: .9rem;
        color: rgb(153,153,155);
    }
    .readMore {
        color: rgb(122, 126, 125);
    }
    .router-link {
        color: rgb(132, 136, 135);
        display: inline-block;
        cursor: pointer;
    }
    .router-link:hover {
        color: rgb(222, 146, 35);
    }
</style>