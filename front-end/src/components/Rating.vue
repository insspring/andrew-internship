<template>
    <div>
        <span class="star-rating" v-if="!checkRate">
            <input type="radio" name="rating" value="1" v-model="rate"><i></i>
            <input type="radio" name="rating" value="2" v-model="rate"><i></i>
            <input type="radio" name="rating" value="3" v-model="rate"><i></i>
            <input type="radio" name="rating" value="4" v-model="rate"><i></i>
            <input type="radio" name="rating" value="5" v-model="rate"><i></i>
        </span>
        <div class="rate-stats">
            <span  class="rate" v-if="checkRate">Rating: {{ averageRate }} / 5</span>
            <span class="votes">Votes: {{ averageVotes }}</span>
        </div>
    </div>
</template>

<script>
    import {editBook} from "../helpers/api";
    import {getBook} from "../helpers/api";
    import {Book} from "../helpers/constuctors";

    export default {
        name: "Rating",
        props: {
            book: Object
        },
        data() {
            return {
                rate: undefined,
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            },
            checkRate() {
                return this.book.rating.some(item => item.id === this.user.id);
            },
            averageRate() {
                let initialValue = 0;
                return Math.trunc(this.book.rating.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.rate / '1', initialValue)/this.book.rating.length * 100)/ 100;
            },
            averageVotes() {
                return this.book.rating.length;
            }
        },
        watch: {
            rate(rate) {
                let bookTemplate = new Book({
                    name: this.book.name,
                    description: this.book.description,
                    author: this.book.author,
                    authorId: this.book.authorId,
                    bookCover: this.book.bookCover,
                    publicationDate: this.book.publicationDate,
                    updateDate: this.book.updateDate,
                    favorites: this.book.favorites,
                    rating: this.book.rating,
                    id: this.book.id
                });
                let data = (id,rate) => {
                    return {
                        id,
                        rate,
                    }
                };
                bookTemplate.addRate(data(this.user.id, rate));
                editBook(this.book.id, bookTemplate).then(() => {
                    getBook(this.$store.state.token,this.book.id).then(result => {
                        this.book = result.data[0];
                    });
                });
            }
        },
        method: {

        }
    }
</script>

<style scoped>
    input {
        cursor: pointer;
    }
    .rate-stats {
        display: flex;
        flex-direction: column;
    }
    .rate {
        font-weight: bold;
        font-size: 1.4rem;
    }
    .votes {
        font-size: 1.2rem;
    }
    .star-rating {
        font-size: 0;
        white-space: nowrap;
        display: inline-block;
        width: 10rem;
        height: 2rem;
        overflow: hidden;
        position: relative;
        background: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjREREREREIiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=');
        background-size: contain;
    }
    .star-rating i {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 20%;
        z-index: 1;
        background: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZERjg4IiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=');
        background-size: contain;
    }
    .star-rating input {
        opacity: 0;
        display: inline-block;
        width: 20%;
        height: 100%;
        margin: 0;
        padding: 0;
        z-index: 2;
        position: relative;
    }
    .star-rating input:hover + i,
    .star-rating input:checked + i {
        opacity: 1;
    }
    .star-rating i ~ i {
        width: 40%;
    }
    .star-rating i ~ i ~ i {
        width: 60%;
    }
    .star-rating i ~ i ~ i ~ i {
        width: 80%;
    }
    .star-rating i ~ i ~ i ~ i ~ i {
        width: 100%;
    }
    ::after,
    ::before {
        height: 100%;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        text-align: center;
        vertical-align: middle;
    }

</style>