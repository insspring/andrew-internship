<template>
    <div>
        <input
                @input="debouncedSearch"
                @focus="search = true"
                @blur="search = false"
        />
        <div class="searchResult">
            <div v-if=" search && !books.length">
                <p>Nothing has been found</p>
            </div>
            <div class="book" v-for="book in books" :key="book.id">
                <router-link class="router-link" :to="'/book/' + book.id">
                    <img class="bookCover" :src="book.bookCover">
                    <div class="desc">
                        <div class="name">{{ book.name }}</div>
                        <div class="name">Author: {{ book.author }}</div>
                    </div>
                </router-link>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from "lodash";
    import {getSearchedByTitle, getSearchedByHashtag, getSearchedByAuthor} from "../helpers/api";

    export default {
        name: "NavSearch",
        data() {
            return {
                books: [],
                page: 1,
                totalCount: 1,
                search: false
            }
        },
        created() {
            this.debouncedSearch = _.debounce((e) => {
                this.books = [];
                this.page = 1;
                if(e.target.value) {
                    this.$store.dispatch('loadingProcess', true);
                    if (e.target.value.split('')[0] === '#') {
                        getSearchedByHashtag(this.$store.state.token, e.target.value.slice(1), this.page).then(result => {
                            this.totalCount = result.headers["x-total-count"];
                            this.books.push(...result.data);
                            this.page++;
                            this.$store.dispatch('loadingProcess', false);
                        });
                    } else {
                        getSearchedByTitle(this.$store.state.token, e.target.value, this.page).then(result => {
                            this.totalCount = result.headers["x-total-count"];
                            this.books.push(...result.data);
                            this.page++;
                            this.$store.dispatch('loadingProcess', false);
                        });
                        getSearchedByAuthor(this.$store.state.token, e.target.value, this.page).then(result => {
                            this.totalCount = result.headers["x-total-count"];
                            this.books.push(...result.data);
                            this.page++;
                            this.$store.dispatch('loadingProcess', false);
                        });
                    }
                }
            }, 1000, {'leading': false, 'trailing': true})
        },
    }
</script>

<style scoped>
    input {
        width: 16rem;
        margin-right: 2rem;
        border: none;
        color: rgb(245, 245, 245);
        border-bottom: 2px solid rgb(80, 80, 80);
        background-color: transparent;
    }
    .searchResult {
        position: absolute;
        top: 5rem;
        color: rgb(205, 205, 205);
        max-height: 26rem;
        width: 16rem;
        overflow: scroll;
    }
    .book {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        background-color: rgb(60, 60, 60);
    }
    .router-link {
        display: flex;
        color: rgb(205, 205, 205);
    }
    .bookCover {
        margin-right: .6rem;
        width: 4rem;
        height: 6rem;
        border: 2px solid rgb(52, 56, 55);
        box-shadow: 0 0 .7rem .1rem rgb(60,60,60);
    }
</style>