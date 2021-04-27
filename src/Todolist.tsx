import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import './App.css';
import {FilterValuesType, TasksStateType, TaskType} from "./App";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "./Task";

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
    changeTitle: (title: string, todoID: string, id: string | null) => void,
    changeTitleTodo: (id: string, title: string) => void
}

const Todolist = React.memo(
    function (props: PropsType) {
        console.log("Todolist called")

        let tasksForTodoList = props.tasks;
        if (props.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
        }
        if (props.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => !!t.isDone)
        }

        const addTask = useCallback((title: string) => {
            props.addNewTask(title, props.id)

        }, [props.addNewTask, props.id])


        const onAllClickHandler = useCallback(() => {
            props.setfilter(props.id, "all")
        }, [props.setfilter, props.id])
        const onActiveClickHandler = useCallback(() => {
            props.setfilter(props.id, "active")
        }, [props.setfilter, props.id])
        const onCompletedClickHandler = useCallback(() => {
            props.setfilter(props.id, "completed")
        }, [props.setfilter, props.id])


        return <div>
            <div className={s.titleTodoWrapper}>
                <h3><EditableSpan title={props.title} todoID={props.id}
                                  onChangeTodo={props.changeTitleTodo}
                                  id={null}/></h3>
                <span><IconButton onClick={() => props.removeTodolist(props.id)}>
            <Delete/>
        </IconButton></span>
            </div>
            <AddItemForm addItem={addTask}/>

            {props.tasks.map((t: any) => {

                return <Task key={t.id} isDone={t.isDone}
                             changeTitle={props.changeTitle} title={t.title} id={t.id} todoID={props.id}
                             removeTask={props.removeTask} changeStatus={props.changeStatus}/>
            })}

            <div>
                <Button onClick={onAllClickHandler} color={'default'}
                        variant={props.filter === 'all' ? 'outlined' : 'text'}>All
                </Button>
                <Button onClick={onActiveClickHandler}
                        color={'primary'} variant={props.filter === 'active' ? 'outlined' : 'text'}>Active
                </Button>
                <Button onClick={onCompletedClickHandler}
                        color={'secondary'} variant={props.filter === 'completed' ? 'outlined' : 'text'}>Completed
                </Button>
            </div>
        </div>
    })

export default Todolist;
