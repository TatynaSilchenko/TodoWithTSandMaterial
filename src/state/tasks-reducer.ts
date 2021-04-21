import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

export type RemoveTasksActionType = {
    type: 'REMOVE-TASKS',
    todolistId: string,
    id: string
}

export type AddTaskActionType = {
    type: 'ADD-TASKS',
    title: string,
    todolistId: string
}
export type ChangeStatusActionType = {
    type: 'CHANGE-STATUS-TASKS',
    id: string,
    status: boolean,
    todolistId: string
}
export type ChangeTitleActionType = {
    type: 'CHANGE-TITLE-TASKS',
    id: string,
    title: string,
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

type ActionType =
    RemoveTasksActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTodolistFilterActionType
    | ChangeStatusActionType
    | ChangeTitleActionType
    | AddTodolistActionType|RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case'REMOVE-TASKS':
            let currentTasks = state[action.todolistId]
            state[action.todolistId] = currentTasks.filter(t => t.id !== action.id)
            return {...state}
        case'ADD-TASKS':
            let task = {id: v1(), title: action.title, isDone: false}
            let todoListTasks = state[action.todolistId]
            state[action.todolistId] = [task, ...todoListTasks]
            return {...state}
        case 'CHANGE-STATUS-TASKS':
            let currentTasksStatus = state[action.todolistId]
            let taskStatus = currentTasksStatus.find(t => t.id === action.id)
            if (taskStatus) {
                taskStatus.isDone = action.status
            }
            return {...state}
        case 'CHANGE-TITLE-TASKS':
            let thisTasks = state[action.todolistId]
            let thisTask = thisTasks.find(t => t.id === action.id)
            if (thisTask) thisTask.title = action.title
            return {...state}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]:[]}

        case 'REMOVE-TODOLIST':
            delete state[action.id]
            return{...state}

        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTaskAC = (id: string, todolistId: string): RemoveTasksActionType => {
    return {type: 'REMOVE-TASKS', todolistId: todolistId, id}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASKS', title, todolistId}
}
export const changeTaskStatusAC = (id: string, status: boolean, todolistId: string): ChangeStatusActionType => {
    return {type: 'CHANGE-STATUS-TASKS', id, status, todolistId}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTitleActionType => {
    return {type: 'CHANGE-TITLE-TASKS', id, title, todolistId}
}

