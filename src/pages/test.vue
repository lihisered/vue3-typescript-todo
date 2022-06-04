<template>
  <h1>TEST</h1>
  <button @click="addTodo">Add todo!</button>
  <ul v-for="todo in todos" :key="todo._id"> 
    <li>
      <pre>{{todo}}</pre>
      <button @click="removeTodo(todo._id)">Remove!</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { todoService } from '@/services/todo.service';
import { Todo, Todos } from '../models/todo.model'

export default defineComponent({
  name: 'test',
  components: {},
  data() {
    return {
      todo: null as Todo | null,
      todos: null as Todos | null
    }
  },
  created() {
    this.getTodos()
    this.getTodo('A5FLD')
  },
  methods: {
    async getTodos() {
      try {
        const todos = await todoService.query('')
        console.log('todos🍇', todos);
        this.todos = todos
      } catch (err ) {
        console.log(err);
      }
    },
    async getTodo(todoId: string) {
      try {
        const todo = await todoService.getById(todoId)
        console.log('todo🍒', todo)
        this.todo = todo
      } catch (err) {
        console.log(err)
      }
    },
    async addTodo() {
      const txt = prompt('Todo txt')
      const createdBy = prompt('Created by?')
      if (!txt || !createdBy) return
      const todo = todoService.getEmptyTodo()
      todo.txt = txt
      todo.createdBy = createdBy
      try {
        const addedTodo = await todoService.save(todo)
        console.log('Added todo!', addedTodo)
        if (this.todos) this.todos.push(addedTodo)
        this.getTodos()
      } catch (err) {
        console.log(err)
      }
    },
    async removeTodo(todoId: string) {
      try {
        const todos = await todoService.remove(todoId)
        console.log('Removed todo', todoId);
        this.todos = todos
      } catch (err) {
        console.log(err);
      }
    }
  }
});
</script>
