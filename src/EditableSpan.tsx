import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";



interface EditableSpanProps {
    title: string
    onChange?: ( title: string, todoID:string, id:string|null) => void,
    onChangeTodo?: ( title: string, todoID:string) => void,
    id:string|null,
    todoID:string
}

type EditModeType = {
    editMode: boolean
}

export function EditableSpan({title,id,todoID, ...restProps}: EditableSpanProps) {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const activateViewMode = () => {
        setEditMode(false)
restProps.onChangeTodo&&restProps.onChangeTodo(todoID,newTitle)
        restProps.onChange&&restProps.onChange(newTitle,todoID,id)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setNewTitle(title)
    }

    return (<>

            {editMode ? <TextField  variant={'outlined'} value={newTitle} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/> :
                <span onDoubleClick={activateEditMode}>{title}</span>}

        </>
    )
}