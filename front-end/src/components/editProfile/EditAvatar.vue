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
    import {getUser} from "../../helpers/api";

    export default {
        name: "EditAvatar",
        components: {ButtonTemplate, EditProfileMenu},
        data() {
            return {
                selectedFile: null,
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
                    editUser(this.$store.state.user.id, {
                        name: this.$store.state.user.name,
                        email: this.$store.state.user.email,
                        password: this.$store.state.user.password,
                        avatar: this.selectedFile,
                        id: this.$store.state.user.id,
                    }).then(() => {
                        getUser(this.$store.state.token).then(result => {
                            this.$store.commit('users',result.data);
                            let user = this.$store.state.users.find(item =>
                                item.email === Object.values(this.$store.state.userData)[0] && item.password === Object.values(this.$store.state.userData)[1]);
                            this.$store.commit('user',user);
                        });
                    });
                    this.selectedFile = null;
                    alert('Changes succeed!');
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