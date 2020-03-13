<template>
    <div class="component">
        <input
                @input="debouncedSearch"
                placeholder="#search"
                v-model="searchInputData"
        />
        <div v-if="search" class="searchResult" id="result">
            <div class="book" v-for="book in books" :key="book.id">
                <router-link class="link" :to="'/book/' + book.id">
                    <img class="bookCover" :src="book.bookCover">
                    <div class="desc">
                        <div class="name">{{ book.name }} {{book.id}}</div>
                        <div class="name">Author: {{ book.author }}</div>
                    </div>
                </router-link>
                <hr>
            </div>
            <div class="searched" v-if="showedResultsConditions">Showed results: {{page-1}}0 out of {{totalCounts}}</div>
            <div class="searched" v-if="lastShowedResultsConditions">Showed results: {{totalCounts}} out of {{totalCounts}}</div>
            <a v-if="nextConditions" class="nextBtn" @click="searchNext">Next</a>
            <div v-if="!books.length && search">
                <p>Nothing has been found</p>
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
                searchInputData: '',
                books: [],
                page: 1,
                pageForAuthor: 1,
                totalCount: 1,
                totalCountForAuthor: 1,
                search: false
            }
        },
        created() {
            this.clickedOutside();
            this.debouncedSearch = _.debounce(this.searchFunc, 1000, {'leading': false, 'trailing': true});
        },
        computed: {
            totalCounts() {
                return Math.max(this.totalCount, this.totalCountForAuthor);
            },
            nextConditions() {
                return this.totalCounts > 10 && this.search && this.page <= Math.ceil(this.totalCounts/10) && this.books.length > 0;
            },
            showedResultsConditions() {
                return this.totalCounts > 10 && this.page-1 < Math.ceil(this.totalCounts/10) && this.books.length > 0;
            },
            lastShowedResultsConditions() {
                return this.totalCounts > 10 && this.page-1 === Math.ceil(this.totalCounts/10) && this.books.length > 0;
            },
        },
        methods: {
            searchFunc(e) {
                this.books = [];
                this.page = 1;
                this.pageForAuthor = 1;
                if(e.target.value) {
                    this.$store.dispatch('loadingProcess', true);
                    if (e.target.value.split('')[0] === '#') {
                        getSearchedByHashtag(this.$store.state.token, e.target.value.slice(1), this.page).then(result => {
                            this.totalCount = result.headers["x-total-count"] * 1;
                            this.books.push(...result.data);
                            this.page++;
                            this.$store.dispatch('loadingProcess', false);
                            this.search = true;
                        });

                    } else {
                        getSearchedByTitle(this.$store.state.token, e.target.value, this.page).then(result => {
                            this.totalCount = result.headers["x-total-count"] * 1;
                            this.books.push(...result.data);
                            this.page++;
                            this.$store.dispatch('loadingProcess', false);
                            this.search = true;
                        });
                        getSearchedByAuthor(this.$store.state.token, e.target.value, this.pageForAuthor).then(result => {
                            this.totalCountForAuthor = result.headers["x-total-count"] * 1;
                            this.books.push(...result.data);
                            this.pageForAuthor++;
                            this.$store.dispatch('loadingProcess', false);
                            this.search = true;
                        });
                        this.books = Array.from(new Set(this.books));
                    }
                }
            },
            searchNext() {
                this.books = [];
                if(this.searchInputData) {
                    this.$store.dispatch('loadingProcess', true);
                    if (this.searchInputData.split('')[0] === '#') {
                        getSearchedByHashtag(this.$store.state.token, this.searchInputData.slice(1), this.page).then(result => {
                            this.books.push(...result.data);
                            this.page++;
                            this.$store.dispatch('loadingProcess', false);
                            this.search = true;
                        });
                    } else {
                        getSearchedByTitle(this.$store.state.token, this.searchInputData, this.page).then(result => {
                            this.books.push(...result.data);
                            this.page++;
                            this.$store.dispatch('loadingProcess', false);
                            this.search = true;
                        });
                        getSearchedByAuthor(this.$store.state.token, this.searchInputData, this.pageForAuthor).then(result => {
                            this.books.push(...result.data);
                            this.pageForAuthor++;
                            this.$store.dispatch('loadingProcess', false);
                            this.search = true;
                        });
                    }
                }
            },
            clickedOutside() {
                document.addEventListener("click", (evt) => {
                    const searchedElement = document.getElementById("result");
                    let targetElement = evt.target;
                    if (targetElement === searchedElement) {
                        this.search = false;
                        return;
                    }
                    this.search = false;
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