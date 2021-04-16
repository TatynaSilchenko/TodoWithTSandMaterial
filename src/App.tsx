import React, {useState} from 'react';
// import './AppCopy.css';
import Todolist from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import Menu from '@material-ui/icons/Menu'

export type FilterValuesType = "active" | "all" | "completed"

export type TodolistType={
    id:string,
    title:string,
    filter:string
}
export type TaskType={
    id: string,
    title:string,
    isDone:boolean
}
export type TasksStateType = {
    [key:string]:TaskType[]
}

function App() {

    let todolistsId1=v1();
    let todolistsId2=v1();

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistsId1, title: "What to learn", filter: 'all'},
        {id: todolistsId2, title: "What to read", filter: 'active'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({ [todolistsId1]:[
        {id: v1(), title: "HTML&Css", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
        [todolistsId2]:[
            {id: v1(), title: "Book1", isDone: true},
            {id: v1(), title: "Book2", isDone: true},
            {id: v1(), title: "Book3", isDone: true},
            {id: v1(), title: "Book4", isDone: false},
            {id: v1(), title: "Book5", isDone: false},
        ]})

    const removeTodolist=(id:string)=>{

        let filteredTodolist=todolists.filter(t=>t.id!==id)
        setTodolists(filteredTodolist)
        delete tasks[id]
        setTasks({...tasks})
    }

    const setFilter =(id:string, filter:string)=>{
        let findedList=todolists.find(t=>t.id===id)
     if(findedList){
         findedList.filter=filter
         setTodolists([...todolists])
     }

    }


    const addNewTask = (title: string, todoID:string) => {
        let task = {id: v1(), title: title, isDone: false}
        let todoListTasks=tasks[todoID]
        tasks[todoID] = [task, ...todoListTasks]
        setTasks({...tasks})
    }

    const addTodolist=(title:string)=>{
        let newTodoID= v1()
        let newTodolist:TodolistType={id:newTodoID, title:title, filter: 'all'}
        todolists=[newTodolist, ...todolists]
        setTodolists(todolists)
        setTasks({...tasks,[newTodoID]:[]})

    }

    const changeStatus = (id: string, isDone: boolean, todoID:string) => {
        let currentTasks=tasks[todoID]
        let task = currentTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }

    const changeTitle = (id: string|null, title: string, todoID:string) => {
        let currentTasks=tasks[todoID]
        let task = currentTasks.find(t => t.id === id)
        if (task) {
            task.title = title
        }
        setTasks({...tasks})
    }
    const changeTitleTodo = ( id: string|null, title: string,todoID:string) => {
        let currentTodolist = todolists.find(t => t.id === todoID)
        if (currentTodolist) {
            currentTodolist.title = title
        }

        setTodolists([...todolists])
    }

    function removeTask(id: string,todoID:string) {
        let currentTasks=tasks[todoID]
        tasks[todoID] = currentTasks.filter(t => t.id != id)
        setTasks({...tasks})
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                {todolists.map(t =>{
                    let tasksForTodoList = tasks[t.id];
                    if (t.filter === "active") {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                    }
                    if (t.filter === "completed") {
                        tasksForTodoList = tasksForTodoList.filter(t => !!t.isDone)
                    }
                    return <Grid item>
                        <Paper style={{padding:'10px'}}>
                        <Todolist id={t.id} title={t.title} key={t.id} addNewTask={addNewTask} tasks={tasksForTodoList}
                                     removeTask={removeTask}
                                     setfilter={setFilter} changeStatus={changeStatus} filter={t.filter}
                                     removeTodolist={removeTodolist} changeTitle={changeTitle} changeTitleTodo={changeTitleTodo}

                    />
                        </Paper>
                    </Grid>})}
                </Grid>
            </Container>



                {/*модальное окно*/}

            {/*<div id="openModal" className="modal">*/}
            {/*    <div className="modal-dialog">*/}
            {/*        <div className="modal-content">*/}
            {/*            <div className="modal-header">*/}
            {/*                <h3 className="modal-title">Название</h3>*/}
            {/*                <a href="#close" title="Close" className="close">×</a>*/}
            {/*            </div>*/}
            {/*            <div className="modal-body">*/}
            {/*                <p>Содержимое модального окна...</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    );
}

export default App;
