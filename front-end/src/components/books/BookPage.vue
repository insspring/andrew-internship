<template>
    <div class="book" v-if="book.description">
        <div class="cover">
            <img class="bookCover" :src="book.bookCover">
        </div>
        <div class="desc">
            <div class="header">
                <div class="item name">{{ book.name }}</div>
                <div>
                    <router-link v-if="user.id === book.authorId" class="router-link" :to="'/book/' + book.id + '/edit'">Edit</router-link>
                    <ButtonTemplate
                            :text="'Add to favorites'"
                            :method="toFavorites"
                    ></ButtonTemplate>
                </div>
            </div>
            <div class="item author">
                {{ $t('author') }}:
                <router-link class="linkToProfile" :to="'/user/' + book.authorId">{{ book.author }}</router-link>
            </div>
            <div class="item description">
                <span v-if="!readMoreActivated">{{ book.description.slice(0,200) }}</span>
                   <a class="readMore" v-if="!readMoreActivated && checkLength" @click.prevent="activateReadMore(book.id)" href="#">  (Read more...)</a>
                <span v-if="readMoreActivated">{{ book.description }}</span>
                <a class="readMore" v-if="readMoreActivated && checkLength" @click.prevent="deactivateReadMore" href="#">  (...less)</a>
            </div>
            <div class="date">
                <div class="item date">{{ $t('uploaded') }}: {{ book.publicationDate }}</div>
                <div class="item date" v-if="book.updateDate">{{ $t('updated') }}: {{ book.updateDate }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {getBook} from "../../helpers/api";
    import {editBook} from "../../helpers/api";
    import ButtonTemplate from "../templates/ButtonTemplate";

    export default {
        name: "BookPage",
        components: {ButtonTemplate},
        props: ['bookId'],
        data() {
            return {
                readMoreActivated: null,
                book: {},
            }
        },
        computed: {
            ...mapGetters({
                users: 'getUsers',
                user: 'getUser'
            }),
            checkLength() {
                return this.book.description.slice(200).length > 0;
            }
        },
        created() {
            getBook(this.$store.state.token,this.bookId).then(result => {
                this.book = result.data[0];
            });
            this.$store.dispatch('discardBooksFeed');
        },
        methods: {
            activateReadMore(id) {
                this.readMoreActivated = id;
            },
            deactivateReadMore() {
                this.readMoreActivated = null;
            },
            toFavorites() {
                editBook(this.book.id, {

                }).then();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .book {
        display: flex;
        padding: 2rem;
        margin-right: 1rem;
        margin-left: 1rem;
        border-radius: 2rem;
        color: rgb(193,193,195);
        background-color: rgb(77, 81, 80);
        box-shadow: 0 0 .7rem .1rem rgb(50,50,50);
    }
    .desc {
        box-sizing: border-box;
        flex-direction: column;
        justify-content: space-between;
    }
    .bookCover {
        margin-right: 1rem;
        width: 10rem;
        height: 16rem;
        border: 2px solid rgb(52, 56, 55);
        box-shadow: 0 0 .7rem .1rem rgb(60,60,60);
    }
    .author {
        font-size: 1.5rem;
        color: rgb(193,193,195);
    }
    .item {
        margin: 1rem 0;
    }
    .header {
        display: flex;
        justify-content: space-between;
    }
    .name {
        margin: 0;
        font-size: 2rem;
        font-weight: bold;
        color: rgb(212, 126, 15);
    }
    .date {
        margin: .2rem 0;
    }
    .linkToProfile{

        @extend .author;
    }
    .linkToProfile:hover {
        color: rgb(233,233,235);
    }
    .readMore {
        color: rgb(122, 126, 125);
    }
    .readMore:hover {
        color: rgb(192, 196, 195);
    }
    .router-link {
        display: block;
        padding: .6rem .8rem .6rem .8rem;
        width: 2rem;
        border-radius: .5rem;
        font-weight: bold;
        cursor: pointer;
        background-color: rgb(96, 96, 95);
        color: rgb(203, 203, 205);
        border: 2px solid rgb(73, 73, 75);
    }
    .router-link:hover {
        background-color: rgb(66, 66, 65);
    }
</style>