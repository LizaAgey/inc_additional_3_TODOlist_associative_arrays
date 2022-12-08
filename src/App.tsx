import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistType = {
    id: string,
    title: string
}

type TasksStateType = {
    [key: string]: DataType
}

type DataType = {
    data: TaskType[]
    filter: FilterValuesType
}


function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn'},
        {id: todolistId2, title: 'What to buy'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: {
            data: [
                {id: v1(), title: 'HTML&CSS1111', isDone: true},
                {id: v1(), title: 'JS1111', isDone: true}
            ],
            filter: 'all'
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: 'HTML&CSS22222', isDone: true},
                {id: v1(), title: 'JS2222', isDone: true}
            ],
            filter: 'all'
        }
    });

    function removeTask(todoListID: string, id: string) {
        let filteredTasks = tasks[todoListID].data.filter(task => task.id != id)

        setTasks({
            ...tasks,
            [todoListID]: {...tasks[todoListID], data: filteredTasks}
        })
    }

    function addTask(todoListID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};

        setTasks({...tasks, [todoListID]: {...tasks[todoListID], data: [newTask, ...tasks[todoListID].data]}})
    }

    function changeTaskStatus(todoListID: string, taskId: string, isDone: boolean) {
        let modifiedTasks = tasks[todoListID].data.map(task => task.id === taskId ? {...task, isDone} : task)

        setTasks({...tasks, [todoListID]: {...tasks[todoListID], data: modifiedTasks}})
    }


    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTasks({...tasks, [todoListID]: {...tasks[todoListID], filter: value}})
    }


    return (
        <div className="App">
            {todolists.map(list => {
                let tasksForTodolist = tasks[list.id].data;

                if (tasks[list.id].filter === 'active') {
                    tasksForTodolist = tasks[list.id].data.filter(t => !t.isDone);
                }
                if (tasks[list.id].filter === 'completed') {
                    tasksForTodolist = tasks[list.id].data.filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={list.id}
                        todoListID={list.id}
                        title={list.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tasks[list.id].filter}
                    />
                )
            })}


        </div>
    );
}

export default App;
