<template>
    <div class="main">
        <EditProfileMenu></EditProfileMenu>

        <div class="form">
            <h2>{{ $t('editPassword') }}</h2>
            <form @submit.prevent>
                <div class="item">
                    <label>{{ $t('oldPassword') }}</label>
                    <InputTemplate
                            v-model="oldPassword"
                            :error="{error: classErrorOldPassword}"
                            :method="startPrintingOldPassword"
                            :type="'password'"
                    ></InputTemplate>
                </div>

                <div class="item">
                    <label>{{ $t('newPassword') }}</label>
                    <InputTemplate
                            v-model="newPassword"
                            :error="{error: classErrorNewPassword}"
                            :method="startPrintingNewPassword"
                            :type="'password'"
                    ></InputTemplate>
                </div>

                <div class="item">
                    <label>{{ $t('newPasswordConfirm') }}</label>
                    <InputTemplate
                            v-model="newPasswordConfirm"
                            :error="{error: classErrorPasswordConfirm}"
                            :method="startPrintingPasswordConfirm"
                            :type="'password'"
                    ></InputTemplate>
                </div>

                <ButtonTemplate
                        :text="$t('submit')"
                        :method="changeUser"
                        class="btn-submit"
                ></ButtonTemplate>
            </form>
        </div>
    </div>
</template>

<script>
    import EditProfileMenu from "./EditProfileMenu";
    import InputTemplate from "../templates/InputTemplate";
    import ButtonTemplate from "../templates/ButtonTemplate";
    import {validation} from "../../helpers/validation";
    import {editUser} from "../../helpers/api";
    import {signInUser} from "../../helpers/api";
    import {parseJwt} from "../../helpers/parsingToken";
    import {User} from "../../helpers/constuctors";

    export default {
        name: "PasswordEdit",
        components: {ButtonTemplate, InputTemplate, EditProfileMenu},
        data() {
            return {
                oldPassword: null,
                newPassword: null,
                newPasswordConfirm: null,
                classErrorOldPassword: false,
                classErrorNewPassword: false,
                classErrorPasswordConfirm: false,
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            }
        },
        methods: {
            startPrintingOldPassword() {
                this.classErrorOldPassword = false;
            },
            startPrintingNewPassword() {
                this.classErrorNewPassword = false;
            },
            startPrintingPasswordConfirm() {
                this.classErrorPasswordConfirm = false;
            },
            changeUser() {
                if(validation('confirm',this.oldPassword, this.user.password) && validation('password',this.newPassword) && validation('confirm',this.newPassword, this.newPasswordConfirm)) {
                    editUser(this.user.id,
                        new User({
                            name: this.user.name,
                            email: this.user.email,
                            password: this.newPassword,
                            avatar: this.user.avatar,
                            subscribes: this.user.subscribes,
                            id: this.user.id
                        })
                    ).then(() => {
                        let person = {
                            email: this.user.email,
                            password: this.newPassword,
                        };
                        signInUser(person).then((result) => {
                            localStorage.removeItem('accessToken');
                            localStorage.setItem('accessToken', result.data.access_token);
                            this.$store.dispatch('setTokenData', {
                                flag: true,
                                token: localStorage.getItem('accessToken'),
                                userData: parseJwt(localStorage.getItem('accessToken')),
                                stop: true
                            });
                        });
                    });
                    alert('Changes succeed!');
                } else {
                    if (!validation('confirm', this.oldPassword, this.user.password)) {
                        this.classErrorOldPassword = true;
                        this.oldPassword = null;
                    }
                    if (!validation('password', this.newPassword)) {
                        this.classErrorNewPassword = true;
                        this.newPassword = null;
                    }
                    if (!validation('confirm', this.newPassword, this.newPasswordConfirm)) {
                        this.classErrorPasswordConfirm = true;
                        this.newPasswordConfirm = null;
                    }
                }
            }
        }
    }
</script>

<style scoped>
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