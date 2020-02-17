<template>
    <div>
        <ul class="library">
            <li class="book" v-for="book in $store.state.userBooks" :key="book.id">
                <div>{{ book.name }}</div>
                <div>{{ book.description }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "UserBooks"
    }
</script>

<style scoped>
    .book {
        color: rgb(193,193,195);
        margin: 3rem;
    }
</style>