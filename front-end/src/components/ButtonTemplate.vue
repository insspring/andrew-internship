<template>
    <button
            class="btn"
            :type="type"
            :text="text"
            @click="handlers()"
    >{{ text }}</button>
</template>

<script>
    export default {
        name: "ButtonTemplate",
        props: {
            type: String,
            text: String,
        },
        data() {
           return {
               visible: true,
           }
        },
        methods: {
            handlers() {
                this.makeVisible();
                this.createPerson();
                this.logPerson();
                this.deleteToken();
            },
            makeVisible() {
                this.$emit('makeVisible', this.visible);
            },
            deleteToken() {
                this.$emit('deleteToken')
            },
            logPerson() {
                this.$emit('logPerson')
            },
            createPerson() {
                this.$emit('createPerson')
            }
        }
    }
</script>

<style scoped>
    .btn {
        margin: .5rem;
        padding: 1rem;
        border-radius: 1em;
        font-weight: bold;
        cursor: pointer;
        background-color: white;
        color: rgb(161, 15, 8);
        border: 3px solid rgb(161, 15, 8);
    }
    .btn:hover {
        background-color: rgb(130, 10, 4);
        color: white;
    }
</style>