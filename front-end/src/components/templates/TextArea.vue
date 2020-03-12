<template>
  <textarea
    :class="error"
    :value="value"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
    @keyup="mixin_autoResize_resize"
    @keydown="handlers"
  ></textarea>
</template>

<script>
import mixinAutoResize from "../../scss/autoResize";

export default {
  name: "ResizeByMixin",
  props: {
    value: String,
    error: Object,
    placeholder: String,
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
  },
  mixins: [mixinAutoResize]
};
</script>

<style lang="scss" scoped>

    @import '../../scss/mixins';

textarea {
  resize: none;
  overflow: hidden;
  min-height: 5rem;
  border: none;
    border-radius: 1rem;
    padding: 1rem;
  color: rgb(245, 245, 245);
  border-bottom: 2px solid rgb(120, 120, 120);
  background-color: rgb(66, 66, 65);
}
.adaptive {
    min-width: 40rem;
    margin-bottom: 1rem;
    @include for-size(tablet-landscape-up) {
        min-width: 30rem;
    }
    @include for-size(phone-only) {
        min-width: 20rem;
    }
}
.error {
  border-color: rgb(166, 40, 40);
}
</style>
