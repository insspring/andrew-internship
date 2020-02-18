<template>
    <div class="form">
        <h2>{{ $t('addBook') }}</h2>
        <form @submit.prevent>
            <div class="item">
                <label>Name</label>
                <InputTemplate
                        v-model="name"
                        :error="{error: classErrorName}"
                        :method="startPrintingName"
                ></InputTemplate>
            </div>

            <div class="item">
                <label>Description</label>
                <textarea cols="40" rows="10" v-model="description"></textarea>
            </div>

            <ButtonTemplate
                    :text="$t('submit')"
                    :method="createBook"
                    class="btn-submit"
            ></ButtonTemplate>
        </form>
    </div>
</template>

<script>
    import {addBook} from "../helpers/api";
    import {getBooks} from "../helpers/api";
    import InputTemplate from "./InputTemplate";
    import ButtonTemplate from "./ButtonTemplate";


    export default {
        name: "AddBook",
        components: {ButtonTemplate, InputTemplate},
        data() {
            return {
                name: '',
                description: '',
                classErrorName: false,
                publicationDate: null
            }
        },
        methods: {
            startPrintingName() {
                this.classErrorName = false;
            },
            createBook() {
                let book = {
                    name: this.name,
                    description: this.description,
                    author: this.$store.state.user.name,
                    publicationDate: Date().toString().split('').slice(0, Date().toString().split('').length - 36).join(''),
                };
                addBook(book).then(() => {
                    this.name = '';
                    this.description = '';
                    this.classErrorName = false;
                    this.publicationDate = null;
                    getBooks(this.$store.state.token).then(result => {
                        console.log(result);
                        this.$store.commit('books',result.data);
                        let userBooks = this.$store.state.books.filter(item =>
                            item.author === this.$store.state.user.name);
                        this.$store.commit('userBooks',userBooks);
                    });
                });

            }
        }
    }
</script>

<style scoped>
    .form {
        color: rgb(203, 203, 205);
        border-radius: 1rem;
        box-shadow: 0 0 1rem .1rem rgb(45, 45, 45);
        padding: 1rem;
        background-color: rgb(76, 76, 75);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .item {
        display: flex;
        flex-direction: column;
    }
    textarea {
        border: none;
        color: rgb(245, 245, 245);
        border-bottom: 2px solid rgb(56, 56, 55);
        background-color: rgb(76, 76, 75);
    }
</style>