import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./Todolist.module.css"
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

interface AddItemFormProps {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormProps) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim()) {
            setError(null)
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setError(null)
            addItem()
        }

    }

    return (
        <div>
            <TextField variant={'outlined'} value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
                   error={!!error} helperText={error}/>

            <IconButton color="primary" onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}