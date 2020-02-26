<template>
  <input type="file" @change="chooseImg" :selectedFile="selectedFile" />
</template>

<script>
export default {
  name: "ChooseImg",
  props: {
    selectedFile: File
  },
  methods: {
    chooseImg(e) {
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          this.selectedFile = reader.result;
        }.bind(this),
        false
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }
};
</script>

<style scoped></style>
