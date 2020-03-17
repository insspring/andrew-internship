<template>
    <div>
        <BooksFeed
                :loadMore="loadMore"
                :books="books"
        ></BooksFeed>
        <div v-if="!books.length && !loading" class="empty">
            <p >Nothing has been added</p>
        </div>
    </div>
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
                user: 'getUser',
                loading: 'getLoading'
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

<style lang="scss" scoped>

    @import "../../scss/variables";

 .empty {
     text-align: center;
     color: $classic-white;
     font-size: 2rem;
     font-weight: 600;
 }
    p {
        @extend .empty
    }
</style>