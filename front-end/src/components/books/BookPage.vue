<template>
    <div class="book" v-if="book.description">
        <div class="cover">
            <img class="bookCover" :src="book.bookCover">
        </div>
        <div class="desc">
            <div class="header">
                <div class="item name">{{ book.name }}</div>
                <router-link v-if="user.id === book.authorId" class="router-link" :to="'/book/' + book.id + '/edit'">Edit</router-link>
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
            <div class="item date">{{ $t('uploaded') }}: {{ book.publicationDate }}</div>
            <div class="item date" v-if="book.updateDate">{{ $t('updated') }}: {{ book.updateDate }}</div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {getBook} from "../../helpers/api";

    export default {
        name: "BookPage",
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
        },
        methods: {
            activateReadMore(id) {
                this.readMoreActivated = id;
            },
            deactivateReadMore() {
                this.readMoreActivated = null;
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
    header {
        display: flex;
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
    .router-link {
        display: block;
        padding: .6rem .8rem .6rem .8rem;
        width: 2rem;
        border-radius: .5rem;
        font-weight: bold;
        cursor: pointer;
        background-color: rgb(96, 96, 95);
        color: rgb(203, 203, 205);
        border: 2px solid rgb(63, 63, 65);
    }
    .router-link:hover {
        background-color: rgb(86, 86, 85);
    }
</style>