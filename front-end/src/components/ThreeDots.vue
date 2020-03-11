<template>
    <div class="dots"></div>
</template>

<script>
    export default {
        name: "ThreeDots"
    }
</script>

<style lang="scss" scoped>

    @import "../scss/variables";

    div {
        position: relative;
        width: .3rem;
        height: .3rem;
        background-color: $wick-white;
        border-radius: 50%;
    }

    div:before, div:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: inherit;
        border-radius: inherit;
    }

    div:before {
        top: .5rem;
    }

    div:after {
        top: 1rem;
    }

    .dots {
        cursor: pointer;
    }
    .dots:hover {
        background-color: $white-hover;
    }
</style>