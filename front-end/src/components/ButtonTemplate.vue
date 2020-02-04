<template>
    <button
            class="btn"
            :type="type"
            :shape="shape"
            :text="text"
    >
    </button>
</template>

<script>
    export default {
        name: "ButtonTemplate",
        props: {
            type: String,
            text: String,
            shape: String,
        },
        methods: {

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
</style>