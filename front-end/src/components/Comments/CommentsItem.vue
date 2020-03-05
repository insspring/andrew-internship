<template>
    <div>
        <div class="comment-header">
            <div class="header">
                <div class="avatar">
                    <img v-if="!comment.commentAuthorAvatar" class="avatar-photo" src="../../assets/none.png.jpg"/>
                    <img v-else class="avatar-photo" :src="comment.commentAuthorAvatar"/>
                </div>
                <div class="author">
                    <router-link class="linkToProfile" :to="'/user/' + comment.commentAuthorId">{{ comment.commentAuthorName }}</router-link>
                </div>
            </div>
            <ButtonTemplate
                    v-if="checkUser() && !edit"
                    :text="'Edit'"
                    :method="editOn"
            ></ButtonTemplate>
            <ButtonTemplate
                    v-if="checkUser() && edit"
                    :text="$t('submit')"
                    :params="[comment]"
                    :method="editComment"
                    class="btn-submit"
            ></ButtonTemplate>
            <div @click="pressLike">
                <Like
                        :active="{active: likeClickingState}"
                ></Like>
                {{ likeCounter }}
            </div>
            <ButtonTemplate
                    v-if="checkUser()"
                    :text="'X'"
                    :params="[comment]"
                    :method="deleteComment"
            ></ButtonTemplate>
        </div>
        <div class="comment-body">
            <TextArea v-if="checkEdit"
                      v-model="comment.commentText"
                      :value="comment.commentText"
                      :class="{error: classErrorComment}"
                      :method="startPrintingComment"
            ></TextArea>
            <div v-else class="commentText" v-html="convert"></div>
        </div>
        <div class="book-footer">
            <div class="date">{{ $t('uploaded') }}: {{ comment.publicationDate }}</div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import ButtonTemplate from "../templates/ButtonTemplate";
    import TextArea from "../templates/TextArea";
    import Like from "../Like";
    import {Comment, LikeClass} from "../../helpers/constuctors";
    import {getComments, editComments, addLike, deleteLike, deleteComment, getLikes} from "../../helpers/api";
    import _ from 'lodash';

    export default {
        name: "CommentsItem",
        components: {ButtonTemplate, TextArea, Like},
        props: {
            comment: Object,
        },
        data() {
            return {
                edit: false,
                classErrorComment: false,
                likes: [],
                likeFirstState: false,
                likeClickingState: false,
                likeCounter: null
            }
        },
        created() {
            this.debouncedSetLike = _.debounce(this.setLike, 500, {'leading': false, 'trailing': true});
            getLikes(this.$store.state.token, this.comment.id).then(result => {
                this.likes.push(...result.data.likes);
                this.likeCounter = this.likes.length;
                if(this.likes.find(item => item.userId === this.user.id)) {
                    this.likeFirstState = true;
                    this.likeClickingState = true;
                }
            });
        },
        computed: {
            ...mapGetters({
                user: 'getUser',
            }),
            convert() {
                let exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
                return this.comment.commentText.replace(exp, "<a class='commentTextLink' href='$1' target='_blank'>$1</a>");
            },
            checkEdit() {
                return this.edit === this.comment.id;
            },
        },
        methods: {
            startPrintingComment() {
                this.classErrorComment = false;
            },
            editOn() {
                this.edit = this.comment.id;
            },
            checkUser() {
                return this.user.id === this.comment.commentAuthorId;
            },
            pressedLikeCounters() {
                this.likeClickingState = !this.likeClickingState;
                if(this.likeClickingState) {
                    this.likeCounter++;
                } else {
                    this.likeCounter--;
                }
            },
            pressLike() {
                this.pressedLikeCounters();
                this.debouncedSetLike();
            },
            setLike() {
                if(this.likeClickingState && this.likeFirstState !== true) {
                    addLike(new LikeClass({
                        commentId: this.comment.id,
                        userId: this.user.id,
                    })).then();
                } else if(!this.likeClickingState && this.likeFirstState === true){
                    deleteLike(this.likes[this.likes.findIndex(item => item.userId === this.user.id)].id);
                }
            },
            editComment(comment) {
                let data = new Comment({
                    bookId: comment.bookId,
                    commentText: comment.commentText,
                    commentAuthorName: comment.commentAuthorName,
                    commentAuthorId: comment.commentAuthorId,
                    commentAuthorAvatar: comment.commentAuthorAvatar,
                    publicationDate: comment.publicationDate,
                    id: comment.id
                });
                editComments(comment.id, data).then(() => {
                    getComments(this.$store.state.token, this.book.id).then(result => {
                        this.comments = [];
                        this.comments.push(...result.data);
                    });
                    this.edit = false;
                    alert('Edited!');
                })
            },
            deleteComment(comment) {
                deleteComment(comment.id).then(() => {
                    getComments(this.$store.state.token, this.book.id).then(result => {
                        this.comments = [];
                        this.comments.push(...result.data);
                    });
                    alert('Deleted!');
                });
            }
        }
    }
</script>

<style scoped>
    .avatar-photo {
        width: 2rem;
        border-radius: 50%;
    }
    .comment-header {
        display: flex;
        justify-content: space-between;
    }
    .header {
        display: flex;
    }
    .linkToProfile{
        display: block;
        margin-left: .5rem;
        font-size: 1.5rem;
        color: rgb(193,193,195);
    }
    .linkToProfile:hover {
        color: rgb(233,233,235);
    }
    .commentText >>> .commentTextLink {
        color: red;
    }
    .date {
        margin-top: .1rem;
        font-size: .9rem;
        color: rgb(153,153,155);
    }
</style>