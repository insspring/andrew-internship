<template>
    <div>
        <Loader></Loader>
        <ul class="library">
            <li class="comment" v-for="comment in comments" :key="comment.id">
                <CommentsItem
                        :comment="comment"
                ></CommentsItem>
            </li>
        </ul>
    </div>
</template>

<script>
    import Loader from "../Loader";
    import {commentsPagination} from "../../helpers/api";
    import {getComments} from "../../helpers/api";
    import CommentsItem from "./CommentsItem";

    export default {
        name: "CommentsFeed",
        components: {CommentsItem, Loader},
        props: {
            book: Object
        },
        data() {
            return {
                bottom: false,
                page: 1,
                totalCount: 1,
                comments: [],
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
                if (bottom && this.totalCount !== 1) {
                    this.loadMore();
                }
            }
        },
        methods: {
            bottomVisible() {
                return window.pageYOffset + window.innerHeight + 100 >= document.documentElement.offsetHeight;
            },
            loadMore () {
                if(this.totalCount > this.comments.length) {
                    this.$store.dispatch('loadingProcess', true);
                    commentsPagination(this.$store.state.token, this.book.id, this.page).then(result => {
                        getComments(this.$store.state.token, this.book.id).then(result => {
                            this.totalCount = result.headers["x-total-count"];
                        });
                        this.comments.push(...result.data.comments);
                        this.page++;
                        this.$store.dispatch('loadingProcess', false);
                    });
                }
            },
/*            pressLike(comment) {
                if(!this.checkLike(comment)) {
                    let data = new Comment({
                        bookId: comment.bookId,
                        commentText: comment.commentText,
                        commentAuthorName: comment.commentAuthorName,
                        commentAuthorId: comment.commentAuthorId,
                        commentAuthorAvatar: comment.commentAuthorAvatar,
                        publicationDate: comment.publicationDate,
                        likes: comment.likes,
                        id: comment.id
                    });
                    data.addLike(this.user.id);
                    editComments(comment.id, data).then(() => {
                        getComments(this.$store.state.token, this.book.id).then(result => {
                            this.comments = [];
                            this.comments.push(...result.data);
                        });
                    })
                } else {
                    let data = new Comment({
                        bookId: comment.bookId,
                        commentText: comment.commentText,
                        commentAuthorName: comment.commentAuthorName,
                        commentAuthorId: comment.commentAuthorId,
                        commentAuthorAvatar: comment.commentAuthorAvatar,
                        publicationDate: comment.publicationDate,
                        likes: comment.likes.filter(item => item !== this.user.id),
                        id: comment.id
                    });
                    editComments(comment.id, data).then(() => {
                        getComments(this.$store.state.token, this.book.id).then(result => {
                            this.comments = [];
                            this.comments.push(...result.data);
                        });
                    })
                }
            },*/
        }
    }
</script>

<style scoped>
    li {
        list-style: none;
    }
    .comment {
        padding: 2rem;
        border-radius: 2rem;
        color: rgb(193,193,195);
        background-color: rgb(77, 81, 80);
        box-shadow: 0 0 .7rem .1rem rgb(50,50,50);
        margin: .5rem 0;
    }
</style>