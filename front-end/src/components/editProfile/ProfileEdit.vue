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
    import {getUser} from "../../helpers/api";

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
                return this.$store.getters.setUser;
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
                        getUser(this.$store.state.token).then(result => {
                            this.$store.commit('users',result.data);
                            let user = this.$store.state.users.find(item =>
                                item.email === Object.values(this.$store.state.userData)[0] && item.password === Object.values(this.$store.state.userData)[1]);
                            this.$store.commit('user',user);
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