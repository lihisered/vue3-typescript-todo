<template>
    <li>
        <router-link :to="{path: `/todo/edit/${todo._id}`}">EDIT TODO</router-link>
        <pre>{{todo}}</pre>
        <button @click="removeTodo(todo._id)">Remove todo</button>
    </li>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
    name: 'todo-preview',
    props: ['todo'],
    methods: {
        removeTodo(todoId: string) {
            this.$emit('removeTodo', todoId)
        }
    }
})
</script>