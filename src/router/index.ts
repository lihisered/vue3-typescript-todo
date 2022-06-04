import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import test from '../pages/test.vue'
import todo from '../pages/todo-app.vue'
import home from '../pages/home.vue'
import todoEdit from '../cmps/todo-edit.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/todo/:filterBy?',
    name: 'todo',
    component: todo,
    children: [
      {
        path: '/todo/edit/:todoId?',
        name: 'todo-edit',
        component: todoEdit
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router