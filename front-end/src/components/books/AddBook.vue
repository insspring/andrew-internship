<template>
    <div class="form">
        <h2>{{ $t('addBook') }}</h2>
        <form @submit.prevent>
            <div class="item">
                <label>{{ $t('title') }}</label>
                <TextArea
                        v-model="name"
                        :value="name"
                        :class="{error: classErrorName}"
                        :method="startPrintingName"
                ></TextArea>
            </div>

            <div class="item">
                <label>{{ $t('description') }}</label>
                <TextArea
                        v-model="description"
                        :value="description"
                        :placeholder="'Required at least 50 symbol length description'"
                        :class="{error: classErrorDesc}"
                        :method="startPrintingDesc"
                ></TextArea>
            </div>

            <div class="item">
                <input type="file"
                       @change="chooseBookCover"
                >
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
    import {addBook} from "../../helpers/api";
    import {validationBooks} from "../../helpers/validation";
    import ButtonTemplate from "../templates/ButtonTemplate";
    import TextArea from "../templates/TextArea";

    export default {
        name: "AddBook",
        components: {TextArea, ButtonTemplate},
        data() {
            return {
                name: '',
                description: '',
                classErrorName: false,
                classErrorDesc: false,
                publicationDate: null,
                selectedFile: null
            }
        },
        methods: {
            startPrintingName() {
                this.classErrorName = false;
            },
            startPrintingDesc() {
                this.classErrorDesc = false;
            },
            chooseBookCover(e) {
                let reader = new FileReader();
                reader.addEventListener('load', function () {
                    this.selectedFile = reader.result;
                }.bind(this), false);
                reader.readAsDataURL(e.target.files[0]);
            },
            createBook() {
                if(validationBooks('name',this.name) && validationBooks('description',this.description) && this.selectedFile !== null) {
                    let book = {
                        name: this.name.trim(),
                        description: this.description.trim(),
                        author: this.$store.state.user.name,
                        authorId: this.$store.state.user.id,
                        bookCover: this.selectedFile,
                        publicationDate: Date().toString().split('').slice(4, Date().toString().split('').length - 37).join('').trim(),
                    };
                    addBook(book).then(() => {
                        alert('Book Added!');
                        this.name = '';
                        this.description = '';
                        this.classErrorName = false;
                        this.publicationDate = null;
                        this.selectedFile = null;
                        this.$router.push({path: '/'});
                    });
                } else {
                    if(!validationBooks('name',this.name)) {
                        this.name = '';
                        this.classErrorName = true;
                    }
                    if(!validationBooks('description',this.description)) {
                        this.description = '';
                        this.classErrorDesc = true;
                    }
                    if(this.selectedFile !== null) {
                        alert('Add book cover!');
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
        padding: 1rem 0;
    }
</style>