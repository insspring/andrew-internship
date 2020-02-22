<template>
    <div class="book">
        <div class="cover">
            <img class="bookCover" :src="book.bookCover">
        </div>
        <div class="desc">
            <div class="item name">{{ book.name }}</div>
            <div class="item author">
                Author:
                <router-link class="linkToProfile" :to="'/user/' + clickedUser(book.author).id">{{ book.author }}</router-link>
            </div>
            <div class="item description">
                <span v-if="!readMoreActivated">{{ book.description.slice(0,200) }}</span>
                   <a class="readMore" v-if="!readMoreActivated" @click.prevent="activateReadMore(book.id)" href="#">  (Read more...)</a>
                <span v-if="readMoreActivated">{{ book.description }}</span>
                <a class="readMore" v-if="readMoreActivated" @click.prevent="deactivateReadMore" href="#">  (...less)</a>
            </div>
            <div class="item date">Uploaded: {{ book.publicationDate }}</div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {getBook} from "../helpers/api";

    export default {
        name: "BookPage",
        props: ['bookId'],
        data() {
            return {
                readMoreActivated: null,
                book: {}
            }
        },
        computed: {
            ...mapGetters({
                users: 'getUsers',
            }),
        },
        created() {
            getBook(this.$store.state.token,this.bookId).then(result => {
                this.book = result.data[0];
            });
            return this.book;
        },
        methods: {
            activateReadMore(id) {
                this.readMoreActivated = id;
            },
            deactivateReadMore() {
                this.readMoreActivated = null;
            },
            clickedUser(author) {
                return this.users.find(item => item.name === author);
            },
        }
    }
</script>

<style scoped>
    .book {
        color: rgb(193,193,195);
        display: flex;
    }
    .desc {
        box-sizing: border-box;
        flex-direction: column;
    }
    .bookCover {
        margin-right: 1rem;
        width: 10rem;
        height: 16rem;
    }
    .item {
        margin: 1rem 0;
    }
    .name {
        margin: 0;
        font-size: 2rem;
        font-weight: bold;
        color: rgb(212, 126, 15);
    }
    .linkToProfile{
        font-size: 1.2rem;
        color: rgb(193,193,195);
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
    .loading {
        color: rgb(122, 126, 125);
    }
</style>