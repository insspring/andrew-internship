<template>
        <input
                :type="type"
                class="input"
                :class="error"
                :value="value"
                @input="$emit('input', $event.target.value)"
                :placeholder="placeholder"
                @keydown="startTyping()"
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

        },
        data() {
            return {
                typing: true
            }
        },
        methods: {
            startTyping() {
                this.$emit('startTyping', this.typing)
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