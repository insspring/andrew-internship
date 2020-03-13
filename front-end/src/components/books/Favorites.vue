<template>
    <BooksFeed
            :loadMore="loadMore"
            :books="books"
    ></BooksFeed>
</template>

<script>
    import {getFavorites} from "../../helpers/api";
    import BooksFeed from "./BooksFeed";
    import {mapGetters} from "vuex";

    export default {
        name: "Favorites",
        components: {BooksFeed},
        data() {
            return {
                page: 1,
                totalCount: 1,
                books: []
            }
        },
        created() {
            this.$store.dispatch('discardBooksFeed');
            if(this.user.id !== undefined) {
                this.loadMore();
            }
        },
        computed: {
            ...mapGetters({
                user: 'getUser'
            }),
        },
        watch: {
            user(user) {
                if(user) {
                    this.loadMore();
                }
            }
        },
        methods: {
            loadMore () {
                if(this.totalCount > this.books.length) {
                    this.$store.dispatch('loadingProcess', true);
                    getFavorites(this.$store.state.token, this.user.id, this.page).then(result => {
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