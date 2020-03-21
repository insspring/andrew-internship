<template>
    <div class="component">
        <div class="form">
            <h2>{{ $t('addBook') }}</h2>
            <form class="form-content" @submit.prevent>
                <div class="item">
                    <label for="title">{{ $t('title') }}</label>
                    <TextArea
                            id="title"
                            class="adaptive"
                            v-model="name"
                            :value="name"
                            :class="{error: classErrorName}"
                            :method="startPrintingName"
                    ></TextArea>
                </div>

                <div class="item">
                    <label for="desc">{{ $t('description') }}</label>
                    <TextArea
                            id="desc"
                            class="adaptive"
                            v-model="description"
                            :value="description"
                            :placeholder="'Required at least 50 symbol length description'"
                            :class="{error: classErrorDesc}"
                            :method="startPrintingDesc"
                    ></TextArea>
                </div>

                <div class="item">
                    <label for="tags">#Hashtags</label>
                    <TextArea
                            id="tags"
                            class="adaptive"
                            v-model="tags"
                            :value="tags"
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
                        :method="createBook"
                        class="btn-submit"
                ></ButtonTemplate>
            </form>
        </div>
    </div>
</template>

<script>
    import {addBook} from "../../helpers/api";
    import {validationBooks} from "../../helpers/validation";
    import {Book} from "../../helpers/constuctors";
    import ButtonTemplate from "../templates/ButtonTemplate";
    import TextArea from "../templates/TextArea";

    export default {
        name: "AddBook",
        components: {TextArea, ButtonTemplate},
        data() {
            return {
                name: '',
                description: '',
                tags: '',
                classErrorName: false,
                classErrorDesc: false,
                classErrorTags: false,
                selectedFile: null
            }
        },
        created() {
            this.$store.dispatch('loadingProcess',false);
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
            createBook() {
                if(validationBooks('name',this.name) && validationBooks('description',this.description) && validationBooks('tags', this.tags) && this.selectedFile !== null) {
                    addBook(new Book({
                        name: this.name,
                        description: this.description,
                        authorId: this.$store.state.user.id,
                        bookCover: this.selectedFile,
                        publicationDate: Date().toString().split('').slice(4, Date().toString().split('').length - 36).join(''),
                        hashtags: this.tags.split('#').map(item => item.trim()).filter(item => item !== ''),
                    })).then(() => {
                        alert('Book Added!');
                        this.name = '';
                        this.description = '';
                        this.tags = '';
                        this.classErrorName = false;
                        this.publicationDate = null;
                        this.selectedFile = null;
                        this.$store.dispatch('discardBooksFeed');
                        this.$router.push({path: '/'});
                    }).catch((error) => {
                        if(error.response) {
                            if(error.response.status === 413) {
                                alert ('Sorry, but image is too large');
                            }
                        }
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
                    if(!validationBooks('tags',this.tags)) {
                        this.classErrorTags = true;
                    }
                    if(this.selectedFile === null) {
                        alert('Add book cover!');
                    }
                }

            }
        }
    }
</script>

<style lang="scss" scoped>

    @import "../../scss/mixins";
    @import "../../scss/variables";

    .component {
        display: flex;
        justify-content: center;
    }
    h2 {
        padding-top: 1rem;
    }
    label {
        margin-bottom: .6rem;
        margin-left: .6rem;
    }
    .form {
        color: $classic-white;
        border-radius: 1rem;
        box-shadow: 0 0 1rem .1rem rgb(45, 45, 45);
        background-color: rgb(76, 76, 75);
        text-align: center;
        min-width: 42rem;
        margin-bottom: 1rem;

        @include for-size(tablet-landscape-up) {
            min-width: 32rem;
        }
        @include for-size(phone-only) {
            min-width: 22rem;
        }
    }
    .form-content {
        text-align: left;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
    }
    .item {
        display: flex;
        flex-direction: column;
        margin-bottom: .6rem;
    }
</style>