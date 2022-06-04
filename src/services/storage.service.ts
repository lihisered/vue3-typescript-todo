import { Todos } from '@/models/todo.model';

export const localStorageService = {
    load,
    store
}

function load(key: string): Todos | null {
    const val = localStorage.getItem(key)
    return (val) ? JSON.parse(val) : null;
}

function store(key: string, val: Todos) {
    localStorage[key] = JSON.stringify(val);
}

