<template>
    <div class="component">
        <input
                @input="debouncedSearch"
                placeholder="#search"
        />
        <div v-if="search" class="searchResult" id="result">
            <div class="book" v-for="book in filteredBooks.slice(counter === 1 ? 0 : (counter-1)*10, counter*10)" :key="book.id">
                <router-link class="link" :to="'/book/' + book.id">
                    <img class="bookCover" :src="book.bookCover">
                    <div class="desc">
                        <div class="name">{{ book.name }}</div>
                        <div class="name" v-if="author(book)">Author: {{ author(book).name }}</div>
                    </div>
                </router-link>
                <hr>
            </div>
            <div class="searched" v-if="showedResultsConditions">Results: {{nextConditions ? counter*10 : filteredBooks.length}} of {{filteredBooks.length}}</div>
            <a id="next" v-show="nextConditions" class="nextBtn" @click="searchNext">Next</a>
            <div v-if="!books.length && search">
                <p>Nothing has been found</p>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from "lodash";
    import {getSearchedByTitle, getSearchedByHashtag, getSearchedByAuthor, getUser} from "../helpers/api";

    export default {
        name: "NavSearch",
        data() {
            return {
                books: [],
                search: false,
                counter: 1,
                users: []
            }
        },
        created() {
            this.clickedOutside();
            this.debouncedSearch = _.debounce(this.searchFunc, 1000, {'leading': false, 'trailing': true});
        },
        computed: {
            filteredBooks() {
                return this.books.filter((item, index) => this.books.findIndex((x) => x.id === item.id) === index);
            },
            nextConditions() {
                return this.filteredBooks.length > 10 && this.search && this.counter < Math.ceil(this.filteredBooks.length/10);
            },
            showedResultsConditions() {
                return this.search && this.filteredBooks.length;
            },
        },
        methods: {
            author(book) {
                return this.users.find(item => item.id === book.authorId);
            },
            searchFunc(e) {
                this.users = [];
                this.counter = 1;
                this.books = [];
                if(e.target.value) {
                    this.$store.dispatch('loadingProcess', true);
                    if (e.target.value.split('')[0] === '#') {
                        getSearchedByHashtag(this.$store.state.token, e.target.value.slice(1)).then(result => {
                            this.books.push(...result.data);
                            this.$store.dispatch('loadingProcess', false);
                            this.search = true;
                        });

                    } else {
                        getSearchedByTitle(this.$store.state.token, e.target.value).then(result => {
                            this.books.push(...result.data);
                            this.$store.dispatch('loadingProcess', false);
                            this.search = true;
                        });
                        getUser(this.$store.state.token).then(result => {
                            let exp = e.target.value;
                            let regex = new RegExp(exp,"g");
                            this.users.push(...(result.data.filter(user => regex.test(user.name))));
                            this.users.forEach(user => {
                                getSearchedByAuthor(this.$store.state.token, user.id).then(result => {
                                    this.books.push(...result.data);
                                    this.$store.dispatch('loadingProcess', false);
                                    this.search = true;
                                });
                            });
                        });
                    }
                }
            },
            searchNext() {
                this.counter++;
                document.getElementById("result").scrollTo(pageXOffset, 0);
            },
            clickedOutside() {
                document.addEventListener("click", (evt) => {
                    const next = document.getElementById("next");
                    let targetElement = evt.target;
                    if (targetElement === next) {
                        this.search = true;
                    } else {
                        this.search = false;
                    }

                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import "../scss/mixins";
    @import "../scss/variables";

    .component {
        margin: 0 .5rem;
        width: 16rem;
    }
    input {
        position: relative;
        padding-left: .2rem;
        width: inherit;
        border: none;
        color: rgb(245, 245, 245);
        border-bottom: 2px solid rgb(80, 80, 80);
        background-color: transparent;

        @include for-size(phone-only) {

        }
    }
    .searchResult {
        position: absolute;
        display: flex;
        flex-direction: column;
        z-index: 5;
        top: 5rem;
        color: rgb(205, 205, 205);
        max-height: 26rem;
        width: inherit;
        overflow: hidden scroll;
        box-shadow: 0 0 .5rem .1rem rgb(50,50,50);
    }
    .book {
        padding: 1rem;
        background-color: rgb(50, 50, 50);
    }
    .link {
        display: flex;
        color: $wick-white;
    }
    .link:hover, .nextBtn:hover {
        color: $white-hover;
    }
    .searched {
        text-align: center;
        color: $classic-white;
        background-color: rgb(50, 50, 50);
    }
    .nextBtn {
        @extend .searched;

        cursor: pointer;
        color: $wick-white;
    }
    .bookCover {
        margin: 0 .6rem .6rem 0;
        width: 4rem;
        height: 6rem;
    }
</style>