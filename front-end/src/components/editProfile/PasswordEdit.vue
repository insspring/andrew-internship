<template>
    <div class="main">
        <EditProfileMenu></EditProfileMenu>

        <div class="form">
            <h2>{{ $t('editPassword') }}</h2>
            <form @submit.prevent>
                <div class="item">
                    <label>Old password</label>
                    <InputTemplate
                            v-model="oldPassword"
                            :error="{error: classErrorOldPassword}"
                            :method="startPrintingOldPassword"
                            :type="'password'"
                    ></InputTemplate>
                </div>

                <div class="item">
                    <label>New password</label>
                    <InputTemplate
                            v-model="newPassword"
                            :error="{error: classErrorNewPassword}"
                            :method="startPrintingNewPassword"
                            :type="'password'"
                    ></InputTemplate>
                </div>

                <div class="item">
                    <label>New password confirm</label>
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
    import InputTemplate from "../InputTemplate";
    import ButtonTemplate from "../ButtonTemplate";
    import {validation} from "../../helpers/validation";
    import {editUser} from "../../helpers/api";
    import {getUser} from "../../helpers/api";

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
                return this.$store.getters.setUser;
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
                if(validation('confirm',this.oldPassword, this.$store.state.user.password) && validation('password',this.newPassword) && validation('confirm',this.newPassword, this.newPasswordConfirm)) {
                    editUser(this.$store.state.user.id, {
                        name: this.$store.state.user.name,
                        email: this.$store.state.user.email,
                        password: this.newPassword,
                        id: this.$store.state.user.id,
                    }).then(result => {
                        console.log(result);
                    });
                    this.oldPassword = null;
                    this.newPassword = null;
                    this.newPasswordConfirm = null;
                    alert('Changes succeed!');
                } else {
                    if (!validation('confirm', this.oldPassword, this.$store.state.user.password)) {
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
                getUser(this.$store.state.token).then(result => {
                    this.$store.commit('users',result.data);
                    let user = this.$store.state.users.find(item =>
                        item.email === Object.values(this.$store.state.userData)[0] && item.password === Object.values(this.$store.state.userData)[1]);
                    this.$store.commit('user',user);
                });
            }
        }
    }
</script>

<style scoped>
    .main {
        display: flex;
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