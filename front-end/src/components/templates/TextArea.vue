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
  min-width: 20rem;
  min-height: 5rem;
  border: none;
  color: rgb(245, 245, 245);
  border-bottom: 2px solid rgb(56, 56, 55);
  background-color: rgb(76, 76, 75);
}
.comment {
    min-width: 40rem;
    margin-bottom: 1rem;

    @include for-size (tablet-landscape-up) {
        min-width: 20rem;
    }
}
.error {
  border-color: rgb(166, 40, 40);
}
</style>
