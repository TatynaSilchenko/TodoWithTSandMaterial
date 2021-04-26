import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType={
    type:'REMOVE-TODOLIST',
    id:string
}

export type AddTodolistActionType={
    type:'ADD-TODOLIST',
    title:string,
    todolistId:string
}

export type ChangeTodolistTitleActionType={
    type:'CHANGE-TODOLIST-TITLE',
    id:string,
    title:string,
}

export type ChangeTodolistFilterActionType={
    type:'CHANGE-TODOLIST-FILTER',
    id:string,
    filter:FilterValuesType
}

type ActionType=RemoveTodolistActionType|AddTodolistActionType|ChangeTodolistTitleActionType|ChangeTodolistFilterActionType

const initialState:Array<TodolistType>=[]

export const todolistReducer=(state:Array<TodolistType>=initialState, action:ActionType)=>{
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t=>t.id!==action.id)
        case 'ADD-TODOLIST':
            let newTodolist:TodolistType={id:action.todolistId, title:action.title, filter: 'all'}
            return [newTodolist,...state]
        case 'CHANGE-TODOLIST-TITLE':

            const currentTodo= state.find(t => t.id === action.id)
            if (currentTodo) {
                currentTodo.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':

            const currentTodolist = state.find(t => t.id === action.id)
            if (currentTodolist) {
                currentTodolist.filter = action.filter
            }
            return [...state]
            // setTodolists([...todolists])
            // return [newTodolist,...state]
        default:
            return state
    }
}


export const  RemoveTodolistAc=(todolistId:string):RemoveTodolistActionType=>{
    return {type:'REMOVE-TODOLIST', id:todolistId}
}
export const AddTodolistAc=(title:string):AddTodolistActionType=>{
    return {type:'ADD-TODOLIST', title, todolistId:v1()}
}
export const ChangeTodolistTitleAc=(id:string, title:string):ChangeTodolistTitleActionType=>{
    return {type:'CHANGE-TODOLIST-TITLE',id, title}
}
export const ChangeTodolistFilterAc=(id:string, filter:FilterValuesType):ChangeTodolistFilterActionType=>{
    return {type:'CHANGE-TODOLIST-FILTER',id, filter}
}