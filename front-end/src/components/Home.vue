<template>
    <BooksFeed
            :loadMore="loadMore"
            :books="books"
    ></BooksFeed>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {booksPagination} from "../helpers/api";
    import BooksFeed from "./books/BooksFeed";

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
                flag: 'getFlag',
                page: 'getPage',
                books: 'getBooks',
            }),
        },
        created() {
            this.loadMore();
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

</style>