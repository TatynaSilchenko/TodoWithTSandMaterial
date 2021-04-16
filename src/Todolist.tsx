import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType, TasksStateType, TaskType} from "./App";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
        <div className={s.titleTodoWrapper}>
        <h3><EditableSpan title={props.title}  todoID={props.id} onChange={props.changeTitleTodo} id={null}/></h3>
        <span><IconButton onClick={() => props.removeTodolist(props.id)}>
            <Delete/>
        </IconButton></span>
        </div>
        <AddItemForm addItem={addTask}/>

            {props.tasks.map((t: any) => {
                const onRemoveClickYandler = () => {
                    props.removeTask(t.id, props.id)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newDone = e.currentTarget.checked
                    props.changeStatus(t.id, newDone, props.id)
                }
                return <div key={t.id} className={t.isDone ? s.isDone : s.active}><Checkbox color={'primary'}
                                                                                        checked={t.isDone}
                                                                                        onChange={onChangeHandler}/>
                    <EditableSpan onChange={props.changeTitle} title={t.title}  id={t.id} todoID={props.id}/>
                    <IconButton onClick={onRemoveClickYandler}>
                        <Delete/>
                    </IconButton>
                </div>
            })}

        <div>
            <Button onClick={onAllClickHandler} color={'default'} variant={props.filter==='all'?'outlined':'text'}>All
            </Button>
            <Button onClick={onActiveClickHandler}
                     color={'primary'} variant={props.filter==='active'?'outlined':'text'}>Active
            </Button>
            <Button onClick={onCompletedClickHandler}
                     color={'secondary'} variant={props.filter==='completed'?'outlined':'text'}>Completed
            </Button>
        </div>
    </div>
}

export default Todolist;
