<template>
    <div class="component">
        <ul class="library">
            <li class="book" v-for="book in $store.state.books" :key="book.id">
                <div>{{ book.name }}</div>
                <div>author: {{ book.author }}</div>
                <div>{{ book.description }}</div>
                <div>{{ book.publicationDate }}</div>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: "Home",
    }
</script>

<style scoped>
    .book {
        color: rgb(193,193,195);
        margin: 3rem;
    }
</style>