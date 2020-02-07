<template>
    <div>
        <select v-model="$i18n.locale">
            <option v-for="(option, index) in options" :value="option.value" :key="`Lang${index}`" @click="storeLanguage">{{ option.text }}</option>
        </select>
    </div>
</template>

<script>
    import i18n from "../i18n/index"

    export default {
        name: "localeChange",
        data() {
          return {
              options: [
                  { text: 'Русский', value: 'ru' },
                  { text: 'English', value: 'en' }
              ],
          }
        },
        methods: {
            storeLanguage() {
                localStorage.setItem('locale', i18n.locale);
            },
        }
    }
</script>

<style lang="scss" scoped>

    @import '../scss/mixins.scss';

    select {
        cursor: pointer;
        margin-right: .5rem;
        display: block;
        font-size: 14px;
        font-family: sans-serif;
        font-weight: bold;
        color: rgb(213, 213, 215);
        line-height: 1rem;
        padding: .6rem .8rem .6rem .8rem;
        width: 7rem;
        text-align: center;
        border: 2px solid rgb(63, 63, 65);
        border-radius: .5rem;
        background-color: rgb(46, 46, 45);
        appearance: none;

        @include for-size(phone-only) {
            border-radius: .1rem;
            border: 1px solid rgb(43, 43, 45);
            background-color: rgb(36, 36, 35);
            width: 100%;
        }
    }
    select:hover {
        box-shadow: 0 0 .5rem .1rem rgb(53, 53, 55);
        color: rgb(243, 243, 245);

        @include for-size(phone-only) {
            box-shadow: -.2rem .1rem .1rem .2rem rgb(43, 43, 45);
        }
    }
    select option {
        font-weight:normal;
    }
</style>