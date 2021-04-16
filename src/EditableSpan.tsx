import React, {ChangeEvent, KeyboardEvent, useState} from "react";



interface EditableSpanProps {
    title: string
    onChange: ( id:string|null, title: string, todoID:string) => void,
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
        restProps.onChange(id,newTitle,todoID)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setNewTitle(title)
    }

    return (<>

            {editMode ? <input value={newTitle} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/> :
                <span onDoubleClick={activateEditMode}>{title}</span>}

        </>
    )
}