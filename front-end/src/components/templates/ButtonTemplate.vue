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
            method: {
                type: Function,
                required: true,
            },
            params: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            handlers() {
                this.method(...this.params);
            },
        }
    }
</script>

<style lang="scss" scoped>

    @import '../../scss/mixins';
    @import "../../scss/variables";

    .btn {
        padding: .6rem .8rem .6rem .8rem;
        border-radius: .5rem;
        font-weight: bold;
        cursor: pointer;
        background-color: rgb(46, 46, 45);
        color: rgb(213, 213, 215);
        border: 2px solid rgb(63, 63, 65);
    }
    .btn:hover {
        color: $white-hover;
    }
    .btn-menu {
        @include for-size(tablet-landscape-up) {
            border: none;
            background-color: transparent;
            width: 100%;
        }
    }
    .btn-menu:hover {
        background-color: rgb(36, 36, 35);
        color: $white-hover;

        @include for-size(tablet-landscape-up) {

        }
    }
    .btn-submit {
        width: 8rem;
        padding: .6rem .8rem .6rem .8rem;
        border-radius: .5rem;
        font-weight: bold;
        cursor: pointer;
        background-color: rgb(83, 83, 85);
    }
    .btn-submit:hover {
        color: $white-hover;
    }
</style>