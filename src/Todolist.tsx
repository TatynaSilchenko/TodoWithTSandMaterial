import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType, TasksStateType, TaskType} from "./App";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

interface PropsType {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string, todoID: string) => void,
    setfilter: (id: string, filter: FilterValuesType) => void,
    addNewTask: (title: string, todoID: string) => void,
    changeStatus: (id: string, isDone: boolean, todoID: string) => void,
    filter: string,
    id: string,
    removeTodolist: (id: string) => void,
    changeTitle:(id:string|null,title:string,todoID:string)=>void,
    changeTitleTodo:(id:string|null, title:string,todoID: string)=>void
}

function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addNewTask(title, props.id)

    }


    const onAllClickHandler = () => {
        props.setfilter(props.id, "all")
    }
    const onActiveClickHandler = () => {
        props.setfilter(props.id, "active")
    }
    const onCompletedClickHandler = () => {
        props.setfilter(props.id, "completed")
    }


    return <div>
        <h3><EditableSpan title={props.title}  todoID={props.id} onChange={props.changeTitleTodo} id={null}/></h3>
        <span><button onClick={() => props.removeTodolist(props.id)}>X</button></span>
        <AddItemForm addItem={addTask}/>
        <ul>
            {props.tasks.map((t: any) => {
                const onRemoveClickYandler = () => {
                    props.removeTask(t.id, props.id)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newDone = e.currentTarget.checked
                    props.changeStatus(t.id, newDone, props.id)
                }
                return <li key={t.id} className={t.isDone ? s.isDone : s.active}><input type="checkbox"
                                                                                        checked={t.isDone}
                                                                                        onChange={onChangeHandler}/>
                    <EditableSpan onChange={props.changeTitle} title={t.title}  id={t.id} todoID={props.id}/>
                    <button onClick={onRemoveClickYandler}>X</button>
                </li>
            })}
        </ul>
        <div>
            <button onClick={onAllClickHandler} className={props.filter === "all" ? s.activeFilter : s.filter}>All
            </button>
            <button onClick={onActiveClickHandler}
                    className={props.filter === "active" ? s.activeFilter : s.filter}>Active
            </button>
            <button onClick={onCompletedClickHandler}
                    className={props.filter === "completed" ? s.activeFilter : s.filter}>Completed
            </button>
        </div>
    </div>
}

export default Todolist;
