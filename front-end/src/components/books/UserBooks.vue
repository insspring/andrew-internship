<template>
    <div>
        <BooksFeed
                :loadMore="loadMore"
                :books="books"
                :userBooks="true"
        ></BooksFeed>
        <div v-if="!books.length && !loading" class="empty">
            <p >Nothing has been added</p>
        </div>
    </div>
</template>

<script>
    import  {getBooks} from "../../helpers/api";
    import BooksFeed from "./BooksFeed";
    import {mapGetters} from 'vuex';

    export default {
        name: "UserBooks",
        props: ['userId','bookId'],
        components: {BooksFeed},
        data() {
            return {
                page: 1,
                totalCount: 1,
                books: []
            }
        },
        created() {
            this.loadMore();
        },
        computed: {
            ...mapGetters({
                user: 'getUser',
                loading: 'getLoading'
            })
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