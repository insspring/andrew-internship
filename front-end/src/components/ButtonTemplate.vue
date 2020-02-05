<template>
    <button
            class="btn"
            :type="type"
            :text="text"
            @click="handlers"
    >{{ text }}</button>
</template>

<script>
    export default {
        name: "ButtonTemplate",
        props: {
            type: String,
            text: String,
            handler: {
                type: Function,
                required: true
            },
            params: Array
        },
        methods: {
            handlers() {
                this.handler(...this.params);
            },
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