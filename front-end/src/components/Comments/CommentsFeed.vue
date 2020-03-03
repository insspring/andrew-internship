<template>
    <div>
        <Loader></Loader>
        <ul class="library">
            <li class="comment" v-for="comment in comments" :key="comment.id">
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
                            v-if="checkUser(comment) && !edit"
                            :text="'Edit'"
                            :params="[comment]"
                            :method="editOn"
                    ></ButtonTemplate>
                    <ButtonTemplate
                            v-if="checkUser(comment) && edit"
                            :text="$t('submit')"
                            :params="[comment]"
                            :method="editComment"
                            class="btn-submit"
                    ></ButtonTemplate>
                    <div @click="pressLike(comment)">
                        <Like
                                :active="{active: checkLike(comment)}"
                        ></Like>
                        {{ comment.likes.length }}
                    </div>
                    <ButtonTemplate
                            v-if="checkUser(comment)"
                            :text="'X'"
                            :params="[comment]"
                            :method="deleteComment"
                    ></ButtonTemplate>
                </div>
                <div class="comment-body">
                    <TextArea v-if="checkEdit(comment)"
                            v-model="comment.commentText"
                            :value="comment.commentText"
                            :class="{error: classErrorComment}"
                            :method="startPrintingComment"
                    ></TextArea>
                    <div v-else class="commentText">{{ comment.commentText }}</div>
                </div>
                <div class="book-footer">
                    <div class="date">{{ $t('uploaded') }}: {{ comment.publicationDate }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import Loader from "../Loader";
    import {mapGetters} from "vuex";
    import {commentsPagination, deleteComment} from "../../helpers/api";
    import {getComments} from "../../helpers/api";
    import Like from "../Like";
    import {editComments} from "../../helpers/api";
    import {Comment} from "../../helpers/constuctors";
    import ButtonTemplate from "../templates/ButtonTemplate";
    import TextArea from "../templates/TextArea";

    export default {
        name: "CommentsFeed",
        components: {TextArea, ButtonTemplate, Like, Loader},
        props: {
            book: Object
        },
        data() {
            return {
                bottom: false,
                page: 1,
                totalCount: 1,
                comments: [],
                edit: false,
                classErrorComment: false
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
        computed: {
            ...mapGetters({
                user: 'getUser',
            }),
        },
        methods: {
            startPrintingComment() {
                this.classErrorComment = false;
            },
            editOn(comment) {
                this.edit = comment.id;
            },
            checkEdit(comment) {
                return this.edit === comment.id;
            },
            checkLike(comment) {
                return comment.likes.find(item => item === this.user.id);
            },
            checkUser(comment) {
                return this.user.id === comment.commentAuthorId;
            },
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
            pressLike(comment) {
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
                        alert('Liked!');
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
                        alert("You don't like it anymore!");
                    })
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
                    likes: comment.likes,
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
    .date {
        margin-top: .1rem;
        font-size: .9rem;
        color: rgb(153,153,155);
    }
</style>