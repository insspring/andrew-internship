<template>
        <input
                :type="type"
                class="input"
                :class="error"
                :value="value"
                @input="$emit('input', $event.target.value)"
                :placeholder="placeholder"
                @keydown="handlers"
        >
</template>

<script>
    export default {
        name: "InputTemplate",
        props: {
            value: String,
            error: Object,
            placeholder: String,
            type: String,
            method: Function,
            params: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            handlers() {
                this.method(...this.params);
            }
        }
    }
</script>

<style scoped>
    .input {
        width: 10rem;
        margin: 1rem 0;
        border: none;
        border-bottom: 2px solid;
    }
    .error {
        border-color: red;
    }
</style>