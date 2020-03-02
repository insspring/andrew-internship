<template>
    <div>
        <Loader></Loader>
        <ul class="library">
            <li class="comment" v-for="comment in comments" :key="comment.id">
                <div class="comment-header">
                    <div class="avatar">
                        <img v-if="!comment.commentAuthorAvatar" class="avatar-photo" src="../../assets/none.png.jpg"/>
                        <img v-else class="avatar-photo" :src="comment.commentAuthorAvatar"/>
                    </div>
                    <div class="item author">
                        <router-link class="linkToProfile" :to="'/user/' + comment.commentAuthorId">{{ comment.commentAuthorName }}</router-link>
                    </div>
                </div>
                <div class="comment-body">
                    <div class="item commentText">{{ comment.commentText }}</div>
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
    import {commentsPagination} from "../../helpers/api";
    import {commentsCounter} from "../../helpers/api";

    export default {
        name: "CommentsFeed",
        components: {Loader},
        props: {
            bookId: Number
        },
        data() {
            return {
                bottom: false,
                page: 1,
                totalCount: 1,
                comments: []
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
            bottomVisible() {
                return window.pageYOffset + window.innerHeight + 100 >= document.documentElement.offsetHeight;
            },
            loadMore () {
                if(this.totalCount > this.comments.length) {
                    this.$store.dispatch('loadingProcess', true);
                    commentsPagination(this.$store.state.token, this.bookId, this.page).then(result => {
                        commentsCounter(this.$store.state.token, this.bookId).then(result => {
                            this.totalCount = result.headers["x-total-count"];
                        });
                        this.comments.push(...result.data.comments);
                        this.page++;
                        this.$store.dispatch('loadingProcess', false);
                    });
                }
            },
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
    }
    .linkToProfile{
        display: block;
        margin-left: .5rem;
        font-size: 1.5rem;
        color: rgb(193,193,195);
    @extend .author;
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