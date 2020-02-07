<template>
    <div class="localeChange">
        <select class="drop-down" v-model="$i18n.locale">
            <option class="drop-down-item" v-for="(option, index) in options" :value="option.value" :key="`Lang${index}`" @click="storeLanguage">{{ option.text }}</option>
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

<style scoped>
    .localeChange {

    }
    .drop-down {
        width: 5rem;

    }
    .drop-down-item {

    }
</style>