<template>
  <div class="home">
    <app-filter></app-filter>
    <main>
      <router-link :to="{path: '/todo/edit'}">ADD TODO</router-link>
      <todo-list :todos="todos" @removeTodo="removeTodo"></todo-list>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { Todos } from '@/models/todo.model'
    import { todoService } from '@/services/todo.service'
    import appFilter from '@/cmps/app-filter.vue'
    import TodoList from '@/cmps/todo-list.vue';
    export default defineComponent ({
      name: 'home',
      components: {
        appFilter,
        TodoList
      },
      data() {
        return {
          filterBy: '' as string | string[],
          todos: null as Todos | null
        }
      },
      created() {
        console.log('Todo app created🍓');
        const { filterBy } = this.$route.params
        this.filterBy = filterBy
        this.getTodos(this.filterBy)
      },
      methods: {
        async getTodos(filterBy: string | string[]) {
          try {
            const todos = await todoService.query(filterBy)
            console.log('todo app', todos);
            this.todos = todos
          } catch (err) {
            console.log(err);
          }
        },
        async removeTodo(todoId: string) {
          try {
            const todos = await todoService.remove(todoId)
            this.todos = todos
          } catch (err) {
            console.log(err); 
          }
        }
      },
      watch: {
        '$route.params'() {
          console.log('Changed!');
          const { filterBy } = this.$route.params
          this.filterBy = filterBy
          this.getTodos(this.filterBy)
        }
      }
    })
</script>

