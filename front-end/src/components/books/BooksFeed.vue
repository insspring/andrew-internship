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
                        <div class="item">
                            <span class="description">{{ book.description.slice(0,150) }}</span>
                            <router-link class="router-link" :to="'/book/' + book.id">(Read more...)</router-link>
                        </div>
                    </div>
                </div>
                <div class="book-footer">
                    <Rating
                            :book="book"
                            :bookPage="false"
                    ></Rating>
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
            userBooks: Boolean,
            favorites: Boolean
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
            if(!this.favorites) {
                this.loadMore();
            }
        },
        watch: {
            bottom(bottom ) {
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
    @import "../../scss/_variables";

    .library {
        display: flex;
        flex-wrap: wrap;

        @include for-size (tablet-landscape-up) {
            justify-content: center;
            margin: 0;
        }
    }
    .book {
        box-sizing: border-box;
        margin: .5rem;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-shrink: 0;
        border-radius: 2rem;
        color: $wick-white;
        background-color: rgb(77, 81, 80);
        box-shadow: 0 0 .7rem .1rem rgb(50,50,50);
        max-width: 24rem;

        @include for-size (tablet-landscape-up) {
            max-width: 24rem;
        }
    }
    .book-body {
        display: flex;
    }
    .desc {
        flex-direction: column;
    }
    .bookCover {
        margin-right: 1rem;
        width: 10rem;
        min-width: 10rem;
        height: 16rem;
        border: 2px solid rgb(52, 56, 55);
        box-shadow: 0 0 .7rem .1rem rgb(60,60,60);

        @include for-size (phone-only) {
            width: 8rem;
            min-width: 8rem;
            height: 12rem;
        }
    }
    .book-footer {
        margin-top: .5rem;
    }
    .item {
        margin: 1rem 0;
    }
    .name {
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        -ms-hyphens: auto;
        width: 100%;
        margin: 0;
        font-size: 1.6rem;
        font-weight: bold;
        color: $orange-color;

        @include for-size (phone-only) {
            font-size: 1.4rem;
        }
    }
    .author {
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        -ms-hyphens: auto;
        font-size: 1.4rem;
        color: $wick-white;

        @include for-size (phone-only) {
            font-size: 1.2rem;
        }
    }
    .description {
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        -ms-hyphens: auto;
        font-size: 1rem;

        @include for-size (phone-only) {
            font-size: .8rem;
        }
    }
    .linkToProfile{

        @extend .author;
    }
    .linkToProfile:hover {
        color: $white-hover;
    }
    .date {
        margin-top: .1rem;
        font-size: 1rem;
        color: rgb(153,153,155);

        @include for-size (phone-only) {
            font-size: .8rem;
        }
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
        color: $orange-color;
    }
</style>