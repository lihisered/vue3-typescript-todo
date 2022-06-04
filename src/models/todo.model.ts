export interface Todo {
    _id: string,
    txt: string,
    createdAt: number,
    createdBy: string,
    category: string
}

export type Todos = Array<Todo>