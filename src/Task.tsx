import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import './App.css';
import {FilterValuesType, TasksStateType, TaskType} from "./App";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

interface PropsType {
    isDone:boolean,
    title:string,
    id:string,
    todoID:string,
    changeTitle:(title: string, todoID: string, id: string | null) => void,
    removeTask: (taskId: string, todoID: string) => void,
    changeStatus: (id: string, isDone: boolean, todoID: string) => void,
}

const Task = React.memo(
    function (props: PropsType) {
        const onRemoveClickYandler = () => {
            props.removeTask(props.id, props.todoID)
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newDone = e.currentTarget.checked
            props.changeStatus(props.id, newDone, props.todoID)
        }

        return <div className={props.isDone ? s.isDone : s.active}>
            <Checkbox color={'primary'}
                      checked={props.isDone}
                      onChange={onChangeHandler}/>
            <EditableSpan
                onChange={props.changeTitle}
                title={props.title} id={props.id} todoID={props.todoID}/>
            <IconButton onClick={onRemoveClickYandler}>
                <Delete/>
            </IconButton>
        </div>
    })

export default Task;
