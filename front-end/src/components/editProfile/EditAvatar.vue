<template>
    <div class="main">
        <EditProfileMenu></EditProfileMenu>

        <div class="form">
            <h2>{{ $t('editAvatar') }}</h2>
            <form @submit.prevent>
                <div class="item">
                    <input type="file"
                           @change="chooseAvatar"
                    >
                </div>

                <ButtonTemplate
                        :text="$t('submit')"
                        :method="uploadAvatar"
                        class="btn-submit"
                ></ButtonTemplate>
            </form>
        </div>
    </div>
</template>

<script>
    import EditProfileMenu from "./EditProfileMenu";
    import ButtonTemplate from "../templates/ButtonTemplate";
    import {editUser} from "../../helpers/api";
    import {parseJwt} from "../../helpers/parsingToken";
    import {User} from "../../helpers/constuctors";

    export default {
        name: "EditAvatar",
        components: {ButtonTemplate, EditProfileMenu},
        data() {
            return {
                selectedFile: null,
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            }
        },
        methods: {
            chooseAvatar(e) {
                let reader = new FileReader();
                reader.addEventListener('load', function () {
                    this.selectedFile = reader.result;
                }.bind(this), false);
                reader.readAsDataURL(e.target.files[0]);
            },
            uploadAvatar() {
                if(this.selectedFile) {
                    editUser(this.user.id,
                        new User({
                            name: this.user.name,
                            email: this.user.email,
                            password: this.user.password,
                            avatar: this.selectedFile,
                            subscribes: this.user.subscribes,
                            id: this.user.id
                        })
                    ).then(() => {
                        this.$store.dispatch('setTokenData', {
                            flag: true,
                            token: localStorage.getItem('accessToken'),
                            userData: parseJwt(localStorage.getItem('accessToken')),
                            stop: true
                        });
                        alert('Changes succeed!');
                    }).catch((error) => {
                        if(error.response) {
                            if(error.response.status === 413) {
                                alert ('Sorry, but image is too large');
                            }
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import "../../scss/mixins";

    input {
        margin-bottom: 1rem;

        @include for-size(phone-only) {
            width: 12rem;
        }
    }
    .main {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .form {
        margin: 1rem;
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
</style>