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

<style lang="scss" scoped>

        @import '../../scss/mixins';

        input {
            width: 10rem;
            margin: 1rem 0;
            border: none;
            color: rgb(245, 245, 245);
            border-bottom: 2px solid rgb(56, 56, 55);
            background-color: rgb(76, 76, 75);

                @include for-size (phone-only) {

                }
        }
        .error {
                border-color: rgb(166, 40, 40);
        }
</style>