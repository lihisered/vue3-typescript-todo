import { storageService } from './async-storage.service';
import { localStorageService } from './storage.service';
import { Todo, Todos } from '@/models/todo.model';

const KEY = 'todosDB'
const TODOS: Todos = [
    {
        _id: 'A5FLD',
        txt: 'Start a vue project',
        createdAt: Date.now(),
        createdBy: 'Shocko Moko',
        category: 'school'
    },
    {
        _id: 'OVJD7',
        txt: 'Add typescript',
        createdAt: Date.now(),
        createdBy: 'Shocko Moko',
        category: 'personal'
    },
    {
        _id: 'PDJ8S',
        txt: 'Sleep',
        createdAt: Date.now(),
        createdBy: 'Lihi',
        category: 'personal'
    },
    {
        _id: '3S5CI',
        txt: '🍓🍇🍒🥑',
        createdAt: Date.now(),
        createdBy: 'Locko',
        category: 'work'
    }
]

export const todoService = {
    query,
    getById,
    remove,
    save,
    getEmptyTodo
}

async function query(filterBy: string | string[]): Promise<Todos | []> {
    if (!localStorageService.load(KEY)) localStorageService.store(KEY, TODOS)
    const todos = await storageService.query(KEY)
    if (!filterBy || filterBy === 'all') return todos
    return todos.filter(todo => todo.category === filterBy)
}

function getById(id: string | string[]): Promise<Todo | null> {
    return storageService.get(KEY, id)
}

function remove(id: string): Promise<Todos> {
    return storageService.remove(KEY, id)
}

function save(todo: Todo): Promise<Todo> {
    return (todo._id) ? storageService.put(KEY, todo) : storageService.post(KEY, todo)
}

function getEmptyTodo(): Todo {
    return {
        _id: '',
        txt: '',
        createdAt: Date.now(),
        createdBy: '',
        category: ''
    }
}