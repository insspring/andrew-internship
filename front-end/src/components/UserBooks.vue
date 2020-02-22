<template>
    <div class="component">
        <ul class="library">
            <li class="book" v-for="book in books" :key="book.id">
                <img class="bookCover" :src="book.bookCover">
                <div class="desc">
                    <div class="item name">{{ book.name }}</div>
                    <div class="item description">
                        <span v-if="!checkReadMoreActivated(book.id)">{{ book.description.slice(0,150) }}</span>
                        <a class="readMore" v-if="!checkReadMoreActivated(book.id)" @click.prevent="activateReadMore(book.id)" href="#">  (Read more...)</a>
                        <span v-if="checkReadMoreActivated(book.id)">{{ book.description }}</span>
                        <a class="readMore" v-if="checkReadMoreActivated(book.id)" @click.prevent="deactivateReadMore" href="#">  (...less)</a>
                    </div>
                    <div class="item date">Uploaded: {{ book.publicationDate }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import  {getBooks} from "../helpers/api";

    export default {
        name: "UserBooks",
        props: ['userId'],
        data() {
            return {
                readMoreActivated: null,
                books: []
            }
        },
        created() {
            getBooks(this.$store.state.token,this.userId).then(result => {
                this.books.push(...result.data);
            });
            return this.books;
        },
        methods: {
            activateReadMore(id) {
                this.readMoreActivated = id;
            },
            deactivateReadMore() {
                this.readMoreActivated = null;
            },
            checkReadMoreActivated(id) {
                return this.readMoreActivated === id;
            },
        }
    }
</script>

<style scoped>
    .component {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .book {
        color: rgb(193,193,195);
        margin: 3rem;
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
    .readMore {
        color: rgb(122, 126, 125);
    }
    .readMore:hover {
        color: rgb(192, 196, 195);
    }
</style>