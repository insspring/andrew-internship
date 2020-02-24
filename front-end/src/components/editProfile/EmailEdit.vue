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
    import {signInUser} from "../../helpers/api";
    import {parseJwt} from "../../helpers/parsingToken";
    import {mapGetters} from 'vuex';

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
            ...mapGetters({
                user: 'getUser',
                users: 'getUsers'
            }),
            validEmail() {
                return this.users.findIndex(item => item.email === this.email);
            },
        },
        methods: {
            startPrintingEmail() {
                this.classErrorEmail = false;
            },
            changeUser () {
                if (validation('email', this.email) && this.validEmail === -1) {
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