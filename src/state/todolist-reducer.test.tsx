import {v1} from 'uuid';
import {TasksStateType, TodolistType} from '../App';
import {AddTodolistAc, ChangeTodolistTitleAc, RemoveTodolistAc, todolistReducer} from "./todolist-reducer";

let todolistId1:string;
let todolistId2:string;
let startState: Array<TodolistType> = [];

beforeEach(()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();

    startState= [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, RemoveTodolistAc(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState: Array<TodolistType> = todolistReducer(startState, AddTodolistAc(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {


    let newTodolistTitle = "New Todolist";


    const endState = todolistReducer(startState, ChangeTodolistTitleAc(todolistId2,newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});




