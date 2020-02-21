<template>
    <div class="component">
        <transition name="fade">
            <div class="loading" v-show="loading">
                <span class="fa fa-spinner fa-spin"></span> Loading
            </div>
        </transition>
        <ul class="library" id="infinite">
            <li class="book" v-for="book in books" :key="book.id">
                <div class="header">
                    <div class="cover">
                        <img class="bookCover" :src="book.bookCover">
                    </div>
                    <div class="desc">
                        <div class="name">{{ book.name }}</div>
                        <div class="author">
                            Author:
                            <router-link class="linkToProfile" :to="'/user/' + clicked(users,book.authorId).id">{{ book.author }}</router-link>
                        </div>
                        <router-link class="linkToProfile" :to="{ name: 'book', params: { bookId: clicked(books,book.id).id }}">Learn More</router-link>
                    </div>
                </div>
                <div class="item date">Uploaded: {{ book.publicationDate }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {getBooks} from "../helpers/api";

    export default {
        name: "Home",
        data() {
            return {
                bottom: false,
                nextItem: 0,
                books: [],
                loading: false,
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
                users: 'getUsers',
            }),
        },
        methods: {
            clicked(bd,searcher) {
                return bd[bd.findIndex(item => item.id === searcher)];
            },
            loadMore () {
                this.loading = true;
                getBooks(this.$store.state.token).then(result => {
                    setTimeout(() => {
                        let x = this.nextItem;
                        for (this.nextItem; this.nextItem < x + 10; this.nextItem++) {
                            if(this.nextItem < result.data.length) {
                                this.books.push(result.data[this.nextItem]);
                            } else {
                                break;
                            }
                        }
                        this.loading = false;
                    }, 200);
                });
            },
            bottomVisible() {
                const scrollY = window.scrollY;
                const visible = document.documentElement.clientHeight;
                const pageHeight = document.documentElement.scrollHeight;
                const bottomOfPage = visible + scrollY >= pageHeight;
                return bottomOfPage || pageHeight < visible;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/mixins.scss';

    .loading {
        text-align: center;
        position: absolute;
        color: #fff;
        z-index: 9;
        padding: 8px 18px;
        border-radius: 5px;
        left: calc(50% - 3rem);
        top: calc(50% - 1rem);
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