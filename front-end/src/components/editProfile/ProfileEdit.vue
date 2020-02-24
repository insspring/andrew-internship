<template>
    <div class="main">
        <EditProfileMenu></EditProfileMenu>

        <div class="form">
            <h2>{{ $t('editProfile') }}</h2>
                <form @submit.prevent>
                    <div class="item">
                        <label>{{ $t('name') }}</label>
                        <InputTemplate
                                v-model="name"
                                :error="{error: classErrorName}"
                                :method="startPrintingName"
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
    import {editUser} from "../../helpers/api";
    import {validation} from "../../helpers/validation";
    import {parseJwt} from "../../helpers/parsingToken";

    export default {
        name: "ProfileEdit",
        components: {ButtonTemplate, InputTemplate, EditProfileMenu},
        data() {
            return {
                name: '',
                classErrorName: false,
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            }
        },
        methods: {
            startPrintingName() {
                this.classErrorName = false;
            },
            changeUser() {
                if(validation('name',this.name)) {
                    editUser(this.$store.state.user.id, {
                        name: this.name,
                        email: this.$store.state.user.email,
                        password: this.$store.state.user.password,
                        avatar: this.$store.state.user.avatar,
                        id: this.$store.state.user.id,
                    }).then(() => {
                        this.$store.dispatch('setTokenData', {
                            flag: true,
                            token: localStorage.getItem('accessToken'),
                            userData: parseJwt(localStorage.getItem('accessToken')),
                            stop: true
                        });
                    });
                    this.name = '';
                    alert('Changes succeed!');
                } else {
                    this.classErrorName = true;
                    this.name = '';
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