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
    import InputTemplate from "../InputTemplate";
    import ButtonTemplate from "../ButtonTemplate";
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
                return this.$store.getters.setUser;
            }
        },
        methods: {
            startPrintingEmail() {
                this.classErrorEmail = false;
            },
            changeUser() {
                if(validation('email',this.email)) {
                    editUser(this.$store.state.user.id, {
                        name: this.$store.state.user.name,
                        email: this.email,
                        password: this.$store.state.user.password,
                        avatar: this.$store.state.user.avatar,
                        id: this.$store.state.user.id,
                    }).then(() => {
                        let person = {
                            email: this.email,
                            password: this.$store.state.user.password,
                        };
                        signInUser(person).then((result) => {
                            localStorage.removeItem('accessToken');
                            localStorage.setItem('accessToken', result.data.access_token);
                            this.$store.commit('token',localStorage.getItem('accessToken'));
                            this.$store.commit('userData', parseJwt(localStorage.getItem('accessToken')));
                            getUser(this.$store.state.token).then(result => {
                                this.$store.commit('users',result.data);
                                let user = this.$store.state.users.find(item =>
                                    item.email === Object.values(this.$store.state.userData)[0] && item.password === Object.values(this.$store.state.userData)[1]);
                                this.$store.commit('user',user);
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