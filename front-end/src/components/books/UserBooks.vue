<template>
    <div class="component">
        <Loader></Loader>
        <ul class="library">
            <li class="book" v-for="book in books" :key="book.id">
                <img class="bookCover" :src="book.bookCover">
                <div class="desc">
                    <router-link class="router-link" :to="'/book/' + book.id">
                        <div class="item name">{{ book.name }}</div>
                    </router-link>
                    <div class="item description">
                        <span v-if="!checkReadMoreActivated(book.id)">{{ book.description.slice(0,150) }}</span>
                        <a class="readMore" v-if="!checkReadMoreActivated(book.id) && checkLength(book.description)" @click.prevent="activateReadMore(book.id)" href="#">  (Read more...)</a>
                        <span v-if="checkReadMoreActivated(book.id)">{{ book.description }}</span>
                        <a class="readMore" v-if="checkReadMoreActivated(book.id) && checkLength(book.description)" @click.prevent="deactivateReadMore" href="#">  (...less)</a>
                    </div>
                    <div class="item date">{{ $t('uploaded') }}: {{ book.publicationDate }}</div>
                    <div class="item date" v-if="book.updateDate">{{ $t('updated') }}: {{ book.updateDate }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import  {getBooks} from "../../helpers/api";
    import Loader from "../Loader";

    export default {
        name: "UserBooks",
        props: ['userId','bookId'],
        components: {Loader},
        data() {
            return {
                readMoreActivated: null,
                bottom: false,
                books: [],
                page: 1,
                totalCount: 1
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
            user() {
                return this.$store.getters.getUser;
            },
        },
        methods: {
            loadMore () {
                if(this.totalCount > this.books.length) {
                    this.$store.dispatch('loadingProcess', true);
                    getBooks(this.$store.state.token, this.userId, this.page).then(result => {
                        this.totalCount = result.headers["x-total-count"];
                        this.books.push(...result.data);
                        this.page++;
                        this.$store.dispatch('loadingProcess', false);
                    });
                }
            },
            bottomVisible() {
                return window.pageYOffset + window.innerHeight + 100 >= document.documentElement.offsetHeight;
            },
            activateReadMore(id) {
                this.readMoreActivated = id;
            },
            deactivateReadMore() {
                this.readMoreActivated = null;
            },
            checkReadMoreActivated(id) {
                return this.readMoreActivated === id;
            },
            checkLength(desc) {
                return desc.slice(200).length > 0;
            }
        }
    }
</script>

<style scoped>
    .component {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .book {
        color: rgb(193,193,195);
        margin: 3rem;
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
    .readMore {
        color: rgb(122, 126, 125);
    }
    .readMore:hover {
        color: rgb(192, 196, 195);
    }
    .router-link {
        display: block;
        cursor: pointer;
    }
    .router-link:hover {
        color: rgb(222, 146, 35);
    }
</style>