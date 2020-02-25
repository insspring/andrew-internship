<template>
    <BooksFeed
            :loadMore="loadMore"
            :books="books"
    ></BooksFeed>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {booksPagination} from "../helpers/api";
    import BooksFeed from "./BooksFeed";

    export default {
        name: "Home",
        components: {BooksFeed},
        data() {
            return {
                bottom: false,
                totalCount: 11,
            }
        },
        computed: {
            ...mapGetters({
                users: 'getUsers',
                flag: 'getFlag',
                page: 'getPage',
                books: 'getBooks',
                loading: 'getLoading',
            }),
        },
        methods: {
            loadMore () {
                if(this.totalCount > this.books.length) {
                    this.$store.dispatch('loadingProcess', true);
                    if (this.flag) {
                        booksPagination(this.$store.state.token, this.page).then(result => {
                            this.totalCount = result.headers["x-total-count"];
                            this.$store.dispatch('setBooks', result.data);
                        });
                    }
                }
            },
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