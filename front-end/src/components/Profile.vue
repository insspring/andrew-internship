<template>
    <div class="component">
        <p>Your personal data</p>
        <div>Name: {{ person.name }}</div>
        <div>Email: {{ person.email }}</div>
        <ButtonTemplate :text="$t('submit')"
                        :method="changeName"
                        :params="['Nick']"
                        class="btn-submit"
        ></ButtonTemplate>
    </div>
</template>

<script>
    import ButtonTemplate from "./ButtonTemplate";

    export default {
        name: "Profile",
        components: {ButtonTemplate},
        computed: {
            person() {
                return this.$store.state.person;
            }
        },
        methods: {
            changeName(param) {
                this.$store.commit('changePersonName', param);
            }
        }
    }
</script>

<style scoped>
    .component {
        padding: 5rem;
        background-color: rgb(95,95,95);
        color: rgb(185,185,185);
    }
</style>