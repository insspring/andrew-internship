<template>
    <div class="comment-area">
        <div class="comment-area-write" v-if="!checkUser">
            <TextArea
                    v-model="commentText"
                    :value="commentText"
                    :placeholder="'Required at least 20 symbol length comment'"
                    :class="{error: classErrorComment}"
                    :method="startPrintingComment"
            ></TextArea>
            <ButtonTemplate
                    :text="$t('submit')"
                    :method="createComment"
                    class="btn-submit"
            ></ButtonTemplate>
        </div>
        <CommentsFeed
                :bookId="book.id"
        ></CommentsFeed>
    </div>
</template>

<script>
    import TextArea from "../templates/TextArea";
    import ButtonTemplate from "../templates/ButtonTemplate";
    import {Comment} from "../../helpers/constuctors";
    import {addComment} from "../../helpers/api";
    import {validationComments} from "../../helpers/validation";
    import {mapGetters} from 'vuex';
    import CommentsFeed from "./CommentsFeed";

    export default {
        name: "Comments",
        components: {CommentsFeed, TextArea, ButtonTemplate},
        props: {
            book: {}
        },
        data() {
            return {
                commentText: '',
                classErrorComment: false,
            }
        },
        computed: {
            ...mapGetters({
                user: 'getUser'
            }),
            checkUser() {
                return this.user.id === this.book.authorId;
            },
        },
        methods: {
            startPrintingComment() {
                this.classErrorComment = false;
            },
            createComment() {
                if(validationComments(this.commentText)) {
                    addComment(new Comment({
                        bookId: this.book.id,
                        commentText: this.commentText,
                        commentAuthorName: this.user.name,
                        commentAuthorId: this.user.id,
                        commentAuthorAvatar: this.user.avatar,
                        publicationDate: Date().toString().split('').slice(4, Date().toString().split('').length - 36).join('')
                    })).then(() => {
                        this.commentText = '';
                        alert('Comment has been added!');
                    })
                } else {
                    this.classErrorComment = true;
                }
            }
        }
    }
</script>

<style scoped>
    .comment-area {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .comment-area-write {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        border-radius: 2rem;
        color: rgb(193,193,195);
        background-color: rgb(77, 81, 80);
        box-shadow: 0 0 .7rem .1rem rgb(50,50,50);
    }
</style>