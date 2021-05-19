import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistAPI} from "../api/Todolist-api";

export default {
    title: 'API'
}

export const GetTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.getTodolist()
    .then((res)=>
        setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("test new title")
    .then((res)=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)


    useEffect(() => {
        const todolistId = '923de56c-951f-4506-9f8a-787dd19ed589';
        todolistAPI.deleteTodolist(todolistId)
        .then( (res) => {
            setState(res.data);
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = 'ac4253d6-ec0b-4e8c-83f8-18e7fea5f6ac';
        todolistAPI.updateTodolist(todolistId,"newReactTitle")
            .then((res)=>{
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}