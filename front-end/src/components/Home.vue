<template>
    <div class="component">
        <ul class="library">
            <li class="book" v-for="book in $store.state.books" :key="book.id">
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
                        <span v-if="!checkReadMoreActivated(book.id)">{{ book.description.slice(0,200) }}</span>
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

    export default {
        name: "Home",
        data() {
            return {
                readMoreActivated: null,
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            },
            users() {
                return this.$store.getters.getUsers;
            }
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
            clickedUser(author) {
                return this.users.find(item => item.name === author);
            }
        }
    }
</script>

<style scoped>
    .book {
        color: rgb(193,193,195);
        margin: 1rem;
        display: flex;
        border-radius: 2rem;
        background-color: rgb(85,85,85);
        box-shadow: 0 0 .5rem .1rem rgb(55,55,55);
    }
    .desc {
        box-sizing: border-box;
        flex-direction: column;
    }
    .cover {
        padding: 1rem;
    }
    .bookCover {
        border: 3px solid rgb(35,35,35);
        margin: 0 2rem;
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
    .author {
        font-size: 1.5rem;
        color: rgb(213,213,215);
    }
    .linkToProfile {
        font-size: 1.5rem;
        color: rgb(213,213,215);
    }
    .readMore {
        color: rgb(122, 126, 125);
    }
    .readMore:hover {
        color: rgb(192, 196, 195);
    }
</style>