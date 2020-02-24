<template>
    <div class="component">
        <transition name="fade">
            <div class="loading" v-show="loading">
                Loading...
            </div>
        </transition>
        <ul class="library" id="infinite" v-if="books && users">
            <li class="book" v-for="book in books" :key="book.id">
                <div class="header">
                    <div class="cover">
                        <img class="bookCover" :src="book.bookCover">
                    </div>
                    <div class="desc">
                        <div class="name">{{ book.name }}</div>
                        <div class="author">
                            Author:
                            <router-link class="linkToProfile" :to="'/user/' + book.authorId">{{ book.author }}</router-link>
                        </div>
                        <router-link class="linkToProfile" :to="'/book/' + book.id">Learn More</router-link>
                    </div>
                </div>
                <div class="item date">Uploaded: {{ book.publicationDate }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {booksPagination} from "../helpers/api";

    export default {
        name: "Home",
        data() {
            return {
                bottom: false,
                page: 1,
                books: [],
                loading: false,
            }
        },
        mounted() {
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
                users: 'getUsers',
            }),
        },
        methods: {
            loadMore () {
                this.loading = true;
                setTimeout(() => {
                    booksPagination(this.$store.state.token,this.page).then(result => {
                        if(this.page <= Math.ceil(result.headers["x-total-count"]/10)) {
                            this.books.push(...result.data);
                            this.page++;
                            this.loading = false;
                        }
                        this.loading = false;
                    });
                },200);
            },
            bottomVisible() {
                return window.pageYOffset + window.innerHeight + 100 >= document.documentElement.offsetHeight;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/mixins.scss';

    .loading {
        text-align: center;
        position: fixed;
        color: rgb(195, 195, 195);
        z-index: 9;
        border-radius: 5px;
        left: calc(50% - 1rem);
        top: calc(50% - .1rem);
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
    .library {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-left: 2rem;

        @include for-size (phone-only) {
            justify-content: center;
            margin: 0;
        }
    }
    .book {
        width: 20rem;
        color: rgb(193,193,195);
        margin: 1rem;
        display: flex;
        flex-direction: column;
        border-radius: 2rem;
        background-color: rgb(85,85,85);
        box-shadow: 0 0 .5rem .1rem rgb(55,55,55);

        @include for-size (phone-only) {
            margin: .5rem;
        }
    }
    .header {
        display: flex;
    }
    .cover, .desc {
        padding: .5rem 0;
    }
    .desc {
        box-sizing: border-box;
        flex-direction: column;
        justify-content: space-between;
        padding-right: 1rem;
    }
    .bookCover {
        border: 3px solid rgb(35,35,35);
        margin: 0 2rem;
        width: 6rem;
        height: 10rem;
    }
    .item {
        margin: 1rem 0;
    }
    .name {
        font-size: 1.5rem;
        font-weight: bold;
        color: rgb(212, 126, 15);

        @include for-size (phone-only) {
            font-size: 1.2rem;
        }
    }
    .author, .linkToProfile {
        font-size: 1.2rem;
        color: rgb(193,193,195);

        @include for-size (phone-only) {
            font-size: 1rem;
        }
    }
    .linkToProfile:hover {
        color: rgb(233,233,235);
    }
    .date {
        align-self: center;
        font-size: 1rem;

        @include for-size (phone-only) {
            font-size: .7rem;
        }
    }
    .pageNavigation {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pageNum {
        margin: 0 1rem;
        color: rgb(233,233,235);

    }
    .setLimit {
        color: rgb(203,203,205);
    }
    .radio {
        margin: .5rem;
    }
</style>