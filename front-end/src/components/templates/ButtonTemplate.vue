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

    .btn {
        margin-right: .5rem;
        padding: .6rem .8rem .6rem .8rem;
        border-radius: .5rem;
        font-weight: bold;
        cursor: pointer;
        background-color: rgb(46, 46, 45);
        color: rgb(213, 213, 215);
        border: 2px solid rgb(63, 63, 65);
    }
    .btn:hover {
        box-shadow: 0 0 .5rem .1rem rgb(53, 53, 55);
        color: rgb(243, 243, 245);
    }
    .btn-menu {
        @include for-size(phone-only) {
            margin-left: .6rem;
            border-radius: .1rem;
            border: 1px solid rgb(43, 43, 45);
            background-color: transparent;
            width: 100%;
        }
    }
    .btn-menu:hover {
        @include for-size(phone-only) {
            box-shadow: 0 .1rem .1rem .2rem rgb(43, 43, 45);
        }
    }
    .btn-submit {
        padding: .6rem .8rem .6rem .8rem;
        border-radius: .5rem;
        font-weight: bold;
        cursor: pointer;
        background-color: rgb(83, 83, 85);;
        color: rgb(203, 203, 205);
        border: 2px solid rgb(63, 63, 65);
    }
    .btn-submit:hover {
        box-shadow: 0 0 .1rem .05rem rgb(43, 43, 45);
    }
</style>