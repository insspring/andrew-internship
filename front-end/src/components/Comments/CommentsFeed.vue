<template>
    <div>
        <Loader></Loader>
        <ul class="library">
            <li class="comment" v-for="comment in comments" :key="comment.id">
                <CommentsItem
                        :comment="comment"
                        :edit="edit"
                        :failedValidation="error"
                        @editOn="editOn"
                        @editOff="editOff"
                        @startPrinting="startPrinting"
                        :editComment="editComment"
                        :deleteComment="deleteComment"
                ></CommentsItem>
            </li>
        </ul>
    </div>
</template>

<script>
    import Loader from "../Loader";
    import {getComments, deleteComment, editComments} from "../../helpers/api";
    import CommentsItem from "./CommentsItem";
    import {Comment} from "../../helpers/constuctors";
    import {validationComments} from "../../helpers/validation";

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
                edit: 0,
                error: false
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
                        getComments(this.$store.state.token, this.book.id, this.page).then(result => {
                            this.totalCount = result.headers["x-total-count"];
                            this.comments.push(...result.data);
                            this.page++;
                            this.$store.dispatch('loadingProcess', false);
                        });
                    }
            },
            editOn(id) {
                this.edit = id;
            },
            editOff(param) {
                this.edit = param;
            },
            startPrinting() {
                this.error = false;
            },
            editComment(comment) {
                let data = new Comment({
                    bookId: comment.bookId,
                    commentText: comment.commentText,
                    commentAuthorId: comment.commentAuthorId,
                    publicationDate: comment.publicationDate,
                    id: comment.id
                });
                if(validationComments(comment.commentText)) {
                    editComments(comment.id, data).then(() => {
                        getComments(this.$store.state.token, this.book.id).then(result => {
                            this.comments = [];
                            this.comments.push(...result.data);
                        });
                        this.edit = 0;
                    })
                } else {
                    this.error = true;
                }
            },
            deleteComment(comment) {
                deleteComment(comment.id).then(() => {
                    getComments(this.$store.state.token, this.book.id).then(result => {
                        this.comments = [];
                        this.comments.push(...result.data);
                    });
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import "../../scss/mixins";

    li {
        list-style: none;
    }
    .comment {
        max-width: 40rem;
        padding: 2rem 2.2rem;
        border-radius: 2rem;
        color: rgb(193,193,195);
        background-color: rgb(77, 81, 80);
        box-shadow: 0 0 .7rem .1rem rgb(50,50,50);
        margin: 1rem 0;

        @include for-size(tablet-landscape-up) {
            max-width: 30rem;
        }
        @include for-size(phone-only) {
            max-width: 20rem;
            padding: 1rem 1.2rem;
        }
    }
</style>