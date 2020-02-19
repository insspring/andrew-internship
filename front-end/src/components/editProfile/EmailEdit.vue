<template>
    <div class="main">
        <EditProfileMenu></EditProfileMenu>

        <div class="form">
            <h2>{{ $t('editProfile') }}</h2>
            <form @submit.prevent>
                <div class="item">
                    <label>{{ $t('email') }}</label>
                    <InputTemplate
                            v-model="email"
                            :error="{error: classErrorEmail}"
                            :method="startPrintingEmail"
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
    import InputTemplate from "../templates/InputTemplate";
    import ButtonTemplate from "../templates/ButtonTemplate";
    import EditProfileMenu from "./EditProfileMenu";
    import {validation} from "../../helpers/validation";
    import {editUser} from "../../helpers/api";
    import {getUser} from "../../helpers/api";
    import {signInUser} from "../../helpers/api";
    import {parseJwt} from "../../helpers/parsingToken";

    export default {
        name: "EmailEdit",
        components: {EditProfileMenu, ButtonTemplate, InputTemplate},
        data() {
            return {
                email: '',
                classErrorEmail: false
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            }
        },
        methods: {
            startPrintingEmail() {
                this.classErrorEmail = false;
            },
            changeUser: function () {
                if (validation('email', this.email)) {
                    editUser(this.user.id, {
                        name: this.user.name,
                        email: this.email,
                        password: this.user.password,
                        avatar: this.user.avatar,
                        id: this.user.id,
                    }).then(() => {
                        let person = {
                            email: this.email,
                            password: this.user.password,
                        };
                        signInUser(person).then((result) => {
                            localStorage.removeItem('accessToken');
                            localStorage.setItem('accessToken', result.data.access_token);
                            this.$store.dispatch('setToken', localStorage.getItem('accessToken'));
                            this.$store.dispatch('userData', parseJwt(localStorage.getItem('accessToken')));
                            getUser(this.$store.state.token).then(result => {
                                this.$store.dispatch('users', result.data);
                                let user = this.$store.state.users.find(item =>
                                    item.email === Object.values(this.$store.state.userData)[0] && item.password === Object.values(this.$store.state.userData)[1]);
                                this.$store.dispatch('user', user);
                            });

                        });
                    });
                    alert('Changes succeed!');
                } else {
                    this.classErrorEmail = true;
                    this.email = '';
                }
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