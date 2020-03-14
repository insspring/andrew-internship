<template>
    <BooksFeed
            :books="books"
            :loadMore="loadMore"
    ></BooksFeed>
</template>

<script>
    import {getSearchedByHashtag} from "../../helpers/api";
    import BooksFeed from "./BooksFeed";

    export default {
        name: "Searched",
        components: {BooksFeed},
        props: ['hashtag'],
        data() {
            return {
                books: [],
                page: 1,
                totalCount: 1,
            }
        },
        created() {
            this.$store.dispatch('discardBooksFeed');
            this.loadMore();
        },
        methods: {
            loadMore () {
                if(this.totalCount > this.books.length) {
                    this.$store.dispatch('loadingProcess', true);
                    getSearchedByHashtag(this.$store.state.token, this.hashtag, this.page).then(result => {
                        this.totalCount = result.headers["x-total-count"];
                        this.books.push(...result.data);
                        this.page++;
                        this.$store.dispatch('loadingProcess', false);
                    });
                }
            },
        }
    }
</script>

<style scoped>

</style>