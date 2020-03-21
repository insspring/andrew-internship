<template>
    <div>
        <div class="comment-header">
            <router-link class="linkToProfile" :to="'/user/' + comment.commentAuthorId">
                <div class="header">
                    <div class="avatar">
                        <img v-if="!author.avatar" class="avatar-photo" src="../../assets/none.png.jpg"/>
                        <img v-else class="avatar-photo" :src="author.avatar"/>
                    </div>
                    <div class="author">
                        {{ author.name }}
                    </div>
                </div>
            </router-link>
            <div class="edit-buttons" v-if="checkUser() && edit === comment.id">
                <ButtonTemplate
                        :text="$t('submit')"
                        :params="[comment]"
                        :method="editComment"
                        class="btn"
                ></ButtonTemplate>
                <ButtonTemplate
                        :text="'Cancel'"
                        :method="editCancel"
                        class="btn"
                ></ButtonTemplate>
            </div>
            <section class="buttons">
                <div @click="pressLike">
                    <Like
                            :active="{active: likeClickingState}"
                    ></Like>
                    {{ likeCounter }}
                </div>
                <div class="dropDown" @click="showMenu" v-if="checkUser()">
                    <ThreeDots :id="comment.id"></ThreeDots>
                    <div class="dropDown-menu" v-if="menuVisible">
                        <ButtonTemplate
                                v-if="checkUser()"
                                :text="$t('edit')"
                                :method="editOn"
                                class="btn"
                        ></ButtonTemplate>
                        <ButtonTemplate
                                v-if="checkUser()"
                                :text="$t('delete')"
                                :params="[comment]"
                                :method="deleteComment"
                                class="btn"
                        ></ButtonTemplate>
                    </div>
                </div>
            </section>
        </div>
        <div class="comment-body">
            <TextArea v-if="checkEdit"
                      class="adaptive"
                      v-model="comment.commentText"
                      :value="comment.commentText"
                      :class="{error: failedValidation}"
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
    import {LikeClass} from "../../helpers/constuctors";
    import {addLike, deleteLike, getLikes, getUser} from "../../helpers/api";
    import _ from 'lodash';
    import ThreeDots from "../ThreeDots";

    export default {
        name: "CommentsItem",
        components: {ThreeDots, ButtonTemplate, TextArea, Like},
        props: {
            comment: Object,
            edit: Number,
            editComment: Function,
            deleteComment: Function,
            failedValidation: Boolean
        },
        data() {
            return {
                author: {},
                classErrorComment: false,
                likes: [],
                likeFirstState: false,
                likeClickingState: false,
                likeCounter: null,
                menuVisible: false,
                commentTextStore: this.comment.commentText
            }
        },
        created() {
            this.debouncedSetLike = _.debounce(this.setLike, 500, {'leading': false, 'trailing': true});
            getUser(this.$store.state.token).then(result => {
                this.author = result.data.find(item => item.id === this.comment.commentAuthorId);
            });
            getLikes(this.$store.state.token, this.comment.id).then(result => {
                this.likes.push(...result.data.likes);
                this.likeCounter = this.likes.length;
                if(this.likes.find(item => item.userId === this.user.id)) {
                    this.likeFirstState = true;
                    this.likeClickingState = true;
                }
            });
            this.clickedOutside();
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
            clickedOutside() {
                document.addEventListener("click", (evt) => {
                    const searchedElement = document.getElementById(this.comment.id);
                    let targetElement = evt.target;
                    if(searchedElement !== targetElement) {
                        this.menuVisible = false;
                    }
                });
            },
            startPrintingComment() {
                this.$emit('startPrinting');
            },
            showMenu() {
                this.menuVisible = !this.menuVisible;
            },
            editOn() {
                this.$emit('editOn', this.comment.id);
            },
            editCancel() {
                this.comment.commentText = this.commentTextStore;
                this.$emit('editOn', 0);
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
        }
    }
</script>

<style lang="scss" scoped>

    @import "../../scss/variables";
    @import "../../scss/mixins";


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
        align-items: center;
    }
    .author {
        margin-left: .5rem;
        font-size: 1.5rem;

        @include for-size(phone-only) {
            font-size: 1.2rem;
        }
    }
    .buttons {
        display: flex;
    }
    .edit-buttons {
        display: flex;
    }
    .btn {
        width: 100%;
        padding: .5rem;
        background-color: transparent;
        border: 1px solid transparent;
        border-radius: 0;
    }
    .btn:hover {
        color: $white-hover;
        background-color: rgb(70,70,70);
        border-bottom: 1px solid rgb(60,60,60)
    }
    .dropDown {
        position: relative;
        margin-left: 2rem;
    }
    .dropDown-menu {
        position: absolute;
        background-color: rgb(100,100,100);
        top: 1.5rem;
        right: 0;
    }
    .linkToProfile{
        display: block;
        color: $wick-white;
    }
    .linkToProfile:hover {
        color: $white-hover;
    }
    .commentText {
        margin: 1rem 0;
        font-size: 1.2rem;
        word-break: break-word;

        ::v-deep .commentTextLink {
            color: $orange-color;
        }
        ::v-deep .commentTextLink:hover {
            text-decoration: underline;
        }

        @include for-size(phone-only) {
            margin: .5rem 0;
            font-size: 1rem;
        }
    }
    .date {
        font-size: .9rem;
        color: rgb(153,153,155);
    }
</style>