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
        todolistAPI.createTodolist("extra new title")
    .then((res)=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)


    useEffect(() => {
        const todolistId = 'b2fab45b-61de-48b9-b6cb-7b1dd79137df';
        todolistAPI.deleteTodolist(todolistId)
        .then( (res) => {
            debugger
            setState(res.data);
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = '9547036b-0ab6-4691-951e-1927e4b39b04';
        todolistAPI.updateTodolist(todolistId,"newReactTitleTest")
            .then((res)=>{
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}