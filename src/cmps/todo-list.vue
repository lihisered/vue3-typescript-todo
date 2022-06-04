<template>
    <section v-if="todos">
        <h2>Todo list</h2>
        <ul>
            <todo-preview v-for="todo in todos" :key="todo._id" 
            :todo="todo" @removeTodo="removeTodo"></todo-preview>
        </ul>
    </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import todoPreview from './todo-preview.vue';

export default defineComponent({
    name: 'todo-list',
    components: { todoPreview },
    props: ['todos'],
    methods: {
        removeTodo(todoId: string) {
            console.log('Todo list', todoId);
            this.$emit('removeTodo', todoId)
        }
    }
})
</script>