import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType={
    type:'REMOVE-TODOLIST',
    id:string
}

export type AddTodolistActionType={
    type:'ADD-TODOLIST',
    title:string
}

export type ChangeTodolistTitleActionType={
    type:'CHANGE-TODOLIST-TITLE',
    id:string,
    title:string
}

export type ChangeTodolistFilterActionType={
    type:'CHANGE-TODOLIST-FILTER',
    id:string,
    filter:FilterValuesType
}

type ActionType=RemoveTodolistActionType|AddTodolistActionType|ChangeTodolistTitleActionType|ChangeTodolistFilterActionType

export const todolistReducer=(state:Array<TodolistType>, action:ActionType)=>{
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t=>t.id!==action.id)
        case 'ADD-TODOLIST':
            let newTodoID= v1()
            let newTodolist:TodolistType={id:newTodoID, title:action.title, filter: 'all'}
            // todolists=[newTodolist, ...todolists]
            // setTodolists(todolists)
            // setTasks({...tasks,[newTodoID]:[]})
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
            throw new Error("I don't understand this type")
    }
}


export const  RemoveTodolistAc=(todolistId:string):RemoveTodolistActionType=>{
    return {type:'REMOVE-TODOLIST', id:todolistId}
}
export const AddTodolistAc=(title:string):AddTodolistActionType=>{
    return {type:'ADD-TODOLIST', title}
}
export const ChangeTodolistTitleAc=(id:string, title:string):ChangeTodolistTitleActionType=>{
    return {type:'CHANGE-TODOLIST-TITLE',id, title}
}
export const ChangeTodolistFilterAc=(id:string, filter:FilterValuesType):ChangeTodolistFilterActionType=>{
    return {type:'CHANGE-TODOLIST-FILTER',id, filter}
}