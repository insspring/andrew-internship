<template>
    <div class="heart" :class="active"></div>
</template>

<script>
    export default {
        name: "Like",
        props: {
            active: Object
        }
    }
</script>

<style scoped>
    .heart {
        background-color: rgb(90,90,90);
        display: inline-block;
        height: 1rem;
        position: relative;
        top: 0;
        transform: rotate(-45deg);
        width: 1rem;
    }
    .heart:before,
    .heart:after {
        content: "";
        background-color: rgb(90,90,90);
        border-radius: 50%;
        height: 1rem;
        position: absolute;
        width: 1rem;
    }
    .heart:before {
        top: -.5rem;
        left: 0;
    }
    .heart:after {
        left: .5rem;
        top: 0;
    }
    .heart:hover, .heart:hover:before, .heart:hover:after {
        background-color: rgb(242, 68, 103);
        cursor: pointer;
    }
    .active, .active:after, .active:before {
        background-color: rgb(242, 68, 103);
    }
</style>