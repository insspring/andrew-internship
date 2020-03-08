<template>
    <div class="form">
        <Loader></Loader>
        <h2>Edit Book</h2>
        <form @submit.prevent>
            <div class="item">
                <label>{{ $t('title') }}</label>
                <TextArea
                        v-model="book.name"
                        :value="book.name"
                        :class="{error: classErrorName}"
                        :method="startPrintingName"
                ></TextArea>
            </div>

            <div class="item">
                <label>{{ $t('description') }}</label>
                <TextArea
                        v-model="book.description"
                        :value="book.description"
                        :class="{error: classErrorDesc}"
                        :method="startPrintingDesc"
                ></TextArea>
            </div>

            <div class="item">
                <label for="tags">#Hashtags</label>
                <TextArea
                        id="tags"
                        v-model="hashtags"
                        :value="hashtags"
                        :class="{error: classErrorTags}"
                        :method="startPrintingTags"
                ></TextArea>
            </div>

            <div class="item">
                <input type="file"
                       @change="chooseBookCover"
                >
            </div>

            <ButtonTemplate
                    :text="$t('submit')"
                    :method="changeBook"
                    class="btn-submit"
            ></ButtonTemplate>
        </form>
    </div>
</template>

<script>
    import {getBook} from "../../helpers/api";
    import {editBook} from "../../helpers/api";
    import {validationBooks} from "../../helpers/validation";
    import {Book} from "../../helpers/constuctors";
    import ButtonTemplate from "../templates/ButtonTemplate";
    import TextArea from "../templates/TextArea";
    import Loader from "../Loader";

    export default {
        name: "BookEdit",
        components: {Loader, ButtonTemplate,TextArea},
        props: ['bookId','userId'],
        data() {
            return {
                classErrorName: false,
                classErrorDesc: false,
                classErrorTags: false,
                selectedFile: null,
                book: {},
                hashtags: ''
            }
        },
        created() {
            getBook(this.$store.state.token,this.bookId).then(result => {
                this.book = result.data[0];
                this.hashtags = '#' + this.book.hashtags.join(' #');
                this.$store.dispatch('loadingProcess', false);
            });
        },
        methods: {
            startPrintingName() {
                this.classErrorName = false;
            },
            startPrintingDesc() {
                this.classErrorDesc = false;
            },
            startPrintingTags() {
                this.classErrorTags = false;
            },
            chooseBookCover(e) {
                let reader = new FileReader();
                reader.addEventListener('load', function () {
                    this.selectedFile = reader.result;
                }.bind(this), false);
                reader.readAsDataURL(e.target.files[0]);
            },
            changeBook() {
                if(validationBooks('name',this.book.name) && validationBooks('description',this.book.description) && validationBooks('tags',this.hashtags)) {
                    editBook(this.bookId, new Book ({
                        name: this.book.name,
                        description: this.book.description,
                        author: this.book.author,
                        authorId: this.book.authorId,
                        bookCover: this.selectedFile ? this.selectedFile : this.book.bookCover,
                        hashtags: this.hashtags.split('#').map(item => item.trim()).filter(item => item !== ''),
                        publicationDate: this.book.publicationDate,
                        updateDate: Date().toString().split('').slice(4, Date().toString().split('').length - 36).join(''),
                        favorites: this.book.favorites,
                        rating: this.book.rating,
                        id: this.book.id
                    })).then(() => {
                        alert('Changes succeed!');
                        this.selectedFile = null;
                        this.$router.push({path: '/book/' + this.book.id});
                        this.$store.dispatch('discardBooksFeed');
                    })
                } else {
                    if(!validationBooks('name',this.book.name)) {
                        this.classErrorName = true;
                    }
                    if(!validationBooks('description',this.book.description)) {
                        this.classErrorDesc = true;
                    }
                    if(!validationBooks('tags',this.hashtags)) {
                        this.classErrorTags = true;
                    }
                }
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
        width: 30rem;
        padding: 1rem 0;
    }
</style>