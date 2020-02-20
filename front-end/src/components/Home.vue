<template>
    <div class="component">
        <ul class="library">
            <li class="book" v-for="book in booksPerPage" :key="book.id">
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
        <ButtonTemplate v-if="page > 1"
                :method="previousPage"
                :text="'Previous'"
        ></ButtonTemplate>
        <ButtonTemplate v-if="page < Math.ceil(books.length/booksPerPage.length)"
                :method="nextPage"
                :text="'Next'"
        ></ButtonTemplate>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {booksPagination} from "../helpers/api";
    import ButtonTemplate from "./templates/ButtonTemplate";

    export default {
        components: {ButtonTemplate},
        created() {
            if(localStorage.getItem('accessToken')) {
                booksPagination(this.$store.state.token,this.page,this.limit).then(result => {
                    this.booksPerPage = result.data;
                })
            }
        },
        name: "Home",
        data() {
            return {
                booksPerPage: [],
                page: 1,
                limit: 1
            }
        },
        computed: {
            ...mapGetters({
                users: 'getUsers',
                books: 'getBooks'
            }),
        },
        methods: {
            clicked(bd,searcher) {
                return bd[bd.findIndex(item => item.id === searcher)];
            },
            nextPage(){
                this.page++;
                booksPagination(this.$store.state.token,this.page,this.limit).then(result => {
                    this.booksPerPage = result.data;
                })
            },
            previousPage(){
                this.page--;
                booksPagination(this.$store.state.token,this.page,this.limit).then(result => {
                    this.booksPerPage = result.data;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/mixins.scss';

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
</style>