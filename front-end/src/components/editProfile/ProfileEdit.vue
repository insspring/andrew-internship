<template>
    <div class="main">
        <EditProfileMenu></EditProfileMenu>

        <div class="form">
            <h2>{{ $t('editProfile') }}</h2>
                <form @submit.prevent>
                    <div class="item">
                        <label>{{ $t('name') }}</label>
                        <InputTemplate
                                :value="$store.state.person.name"
                                :placeholder="$store.state.person.name"
                                :method="changeName"
                        ></InputTemplate>
                    </div>

                    <div class="item">
                        <label>{{ $t('email') }}</label>
                        <InputTemplate
                                v-model="$store.state.person.email"
                                :placeholder="$store.state.person.email"
                                :method="changeEmail"
                        ></InputTemplate>
                    </div>

                    <ButtonTemplate
                            :text="$t('submit')"
                            :method="getUser"
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
import axios from 'axios'
    export default {
        name: "ProfileEdit",
        components: {ButtonTemplate, InputTemplate, EditProfileMenu},
        methods: {
            changeName(e) {
                this.$store.commit('changeName', e.target.value);
            },
            changeEmail(e) {
                this.$store.commit('changeEmail', e.target.value);
            },
            /*editProfile() {
                // this.$store.commit('editPerson');
                axios.put('/users/'+ 1, {
                    "name": "qqq",
                    "email": "gggg@gmail.com",
                    "password": "gggg1111",
                },{
                    headers: {
                        'authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdnZ2dAZ21haWwuY29tIiwicGFzc3dvcmQiOiJnZ2dnMTExMSIsImlhdCI6MTU4MTUxNDU2OSwiZXhwIjoxNTgxNTUwNTY5fQ.39OhqBYLh2Ah9ZEsG0QUwWNSyvvyvDD81u10CYyzQwE'
                    }
                });
            }*/
            getUser() {
                axios.get('/users', {
                    headers: {
                        'authorization': "bearer " + this.$store.state.token
                    }
                }).then(result => {
                    console.log(result);
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