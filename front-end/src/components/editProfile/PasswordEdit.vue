<template>
    <div class="main">
        <EditProfileMenu></EditProfileMenu>

        <div class="form">
            <h2>Edit Password</h2>
            <form>
                <div class="item">
                    <label>Old password</label>
                    <InputTemplate
                            v-model="$store.state.person.password"
                            :error="{error: classErrorName}"
                            :method="startPrintingPassword"
                            :type="'password'"
                    ></InputTemplate>
                </div>

                <div class="item">
                    <label>New password</label>
                    <InputTemplate
                            v-model="$store.state.person.password"
                            :error="{error: classErrorPassword}"
                            :method="startPrintingPassword"
                            :type="'password'"
                    ></InputTemplate>
                </div>

                <div class="item">
                    <label>New password confirm</label>
                    <InputTemplate
                            v-model="$store.state.person.password"
                            :error="{error: classErrorPasswordConfirm}"
                            :method="startPrintingPasswordConfirm"
                            :type="'password'"
                    ></InputTemplate>
                </div>

                <ButtonTemplate
                        :text="$t('submit')"
                        :method="editPassword"
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
    export default {
        name: "PasswordEdit",
        components: {ButtonTemplate, InputTemplate, EditProfileMenu}
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