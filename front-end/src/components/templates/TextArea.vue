<template>
    <div class="wrapper">
    <textarea
            :value="value"
            @input="$emit('input', $event.target.value)"
            @keyup="mixin_autoResize_resize"
    ></textarea>
    </div>
</template>

<script>
    import mixinAutoResize from "../../scss/autoResize";

    export default {
        name: "ResizeByMixin",
        props: {
            value: String
        },
        mixins: [mixinAutoResize],
    };
</script>

<style scoped>
    textarea {
        resize: none;
        overflow: hidden;
        min-width: 20rem;
        min-height: 10rem;
        border: none;
        color: rgb(245, 245, 245);
        border-bottom: 2px solid rgb(56, 56, 55);
        background-color: rgb(76, 76, 75);
    }
</style>