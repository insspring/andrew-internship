<template>
    <BooksFeed
            :loadMore="loadMore"
            :books="books"
            :userBooks="true"
    ></BooksFeed>
</template>

<script>
    import  {getBooks} from "../../helpers/api";
    import BooksFeed from "./BooksFeed";

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
        }
    }
</script>

<style lang="scss" scoped>

</style>