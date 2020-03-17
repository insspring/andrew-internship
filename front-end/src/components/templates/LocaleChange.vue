<template>
    <div>
        <select v-model="$i18n.locale">
            <option
                    v-for="(option, index) in options"
                    :value="option.value"
                    :key="`Lang${index}`"
            >{{ option.text }}</option
            >
        </select>
    </div>
</template>

<script>

    export default {
        name: "localeChange",
        data() {
            return {
                options: [
                    { text: "Русский", value: "ru" },
                    { text: "English", value: "en" }
                    ]
            };
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../scss/mixins";

    select {
        box-sizing: border-box;
        margin-right: .5rem;
        padding: .7rem .8rem .7rem .8rem;
        border-radius: .5rem;
        font-weight: bold;
        cursor: pointer;
        background-color: rgb(46, 46, 45);
        color: rgb(193, 193, 195);
        border: 2px solid rgb(63, 63, 65);
        display: block;
        font-family: sans-serif;
        line-height: 1.1rem;
        width: 7rem;
        text-align: center;
        appearance: none;

        @include for-size(tablet-landscape-up) {
            border: none;
            background-color: rgb(36, 36, 35);
            width: 100%;
        }
    }
    select:hover {
        background-color: rgb(36, 36, 35);
        color: rgb(243, 243, 245);

        @include for-size(tablet-landscape-up) {

        }
    }
    select option {
        font-weight: normal;
    }
</style>
