import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer
})

export const store=createStore(rootReducer)

export type AppRootStateType=ReturnType<typeof rootReducer>

// @ts-ignore
window.store=store