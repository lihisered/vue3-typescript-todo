import { Todo, Todos } from '@/models/todo.model';

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function query(entityType: string): Promise<Todos | []> {
    const entities = JSON.parse(localStorage.getItem(entityType) || '[]')
    return Promise.resolve(entities)
}

async function get(entityType: string, entityId: string | string[]): Promise<Todo | null> {
    const entities = await query(entityType)
    return entities.find(entity => entity._id === entityId) || null
}

async function post(entityType: string, newEntity: Todo): Promise<Todo> {
    newEntity._id = _makeId()
    const entities: Todo[] = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
}

async function postMany(entityType: string, newEntities: Todos): Promise<Todos> {
    const entities: Todo[] = await query(entityType)
    newEntities = newEntities.map(entity => ({ ...entity, _id: _makeId() }))
    entities.push(...newEntities)
    _save(entityType, entities)
    return entities
}

async function put(entityType: string, updatedEntity: Todo): Promise<Todo> {
    const entities: Todo[] = await query(entityType)
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
}

async function remove(entityType: string, entityId: string): Promise<Todos | []> {
    const entities: Todo[] = await query(entityType)
    const idx = entities.findIndex(entity => entity._id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
    return entities
}

function _save(entityType: string, entities: Todos) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}