<template>
    <h1>EDIT or ADD</h1>
    <section v-if="todo">
        <input type="text" v-model="todo.txt">
        <input type="text" v-model="todo.category">
        <input type="text" v-model="todo.createdBy">
        <button @click="saveTodo(todo)">SAVE</button>
        <pre>{{todo}}</pre>
    </section>
</template>

<script lang="ts">
import { Todo } from '@/models/todo.model';
import { todoService } from '@/services/todo.service';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
    name: 'todo-edit',
    data() {
        return {
            todo: null as Todo | null
        }
    },
    created() {
        const { todoId } = this.$route.params
        if (todoId) this.getTodoById(todoId)
        else this.getEmptyTodo()
    },
    methods: {
        getEmptyTodo() {
            this.todo = todoService.getEmptyTodo()
            console.log('🍒', this.todo)  
        },
        async getTodoById(todoId: string | string[]) {
            try {
                const todo = await todoService.getById(todoId)
                this.todo = todo
                console.log('🍒', this.todo)  
            } catch (err) {
                console.log(err);
            }
        },
        async saveTodo(todo: Todo | null) {
            if (!todo) return
            try {
                await todoService.save(todo)
                console.log('SAVED!');
                this.$router.push('/todo/all')
            } catch (err) {
                console.log(err);
            }
        }
    },
    watch: {
        '$route.params'() {
            const { todoId } = this.$route.params
            if (todoId) this.getTodoById(todoId)
            else this.getEmptyTodo()
        }
    }
})
</script>