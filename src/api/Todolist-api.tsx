import axios from 'axios';

const instance=axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY':'db26107a-a86c-4eaf-937e-642d89d695c5'
    }
})

export type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}

type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

// const settings={
//     withCredentials:true,
//     headers:{'API-KEY':'db26107a-a86c-4eaf-937e-642d89d695c5'}
//
// }

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(`todo-lists/${todolistId}`, {title: title})
        return promise
    },

    getTodolist(){
        const promise=instance.get('todo-lists')
        return promise
    },

    createTodolist(title:string){
        const promise=instance.post<ResponseType<{item:TodolistType}>>('todo-lists',{title:title})
        return promise
    },

    deleteTodolist(todolistId:string){
        const promise=instance.delete(`todo-lists/${todolistId}`)
        return promise
    }
}