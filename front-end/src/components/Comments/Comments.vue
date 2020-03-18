<template>
    <div class="comment-area">
        <div class="comment-area-write" v-if="!checkUser">
            <TextArea
                    class="adaptive"
                    v-model="commentText"
                    :value="commentText"
                    :placeholder="'Required at least 20 symbol length comment'"
                    :class="{error: classErrorComment}"
                    :method="startPrintingComment"
            ></TextArea>
            <ButtonTemplate
                    :text="$t('submit')"
                    :method="createComment"
                    class="btn-submit submit"
            ></ButtonTemplate>
        </div>
        <CommentsFeed
                :book="book"
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
            book: Object,
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
                        commentAuthorId: this.user.id,
                        publicationDate: Date().toString().split('').slice(4, Date().toString().split('').length - 36).join('')
                    })).then(() => {
                        this.commentText = '';
                    })
                } else {
                    this.classErrorComment = true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import "../../scss/mixins";
    @import "../../scss/variables";

    .comment-area {
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        @include for-size(tablet-landscape-up) {

        }
    }
    .comment-area-write {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        border-radius: 2rem;
        color: $wick-white;
        background-color: rgb(77, 81, 80);
        box-shadow: 0 0 .7rem .1rem rgb(50,50,50);

        @include for-size(phone-only) {
            padding: 1.2rem;
        }
    }
</style>