import React, { useState } from 'react'
import TodoItem, { TodoItemInterface } from './TodoItem'

const initialTodos: TodoItemInterface[] = [
    { task: 'Fold my laundry', completed: false },
    { task: 'Record ts tutorial', completed: true},
    { task: 'Record the React tutorial', completed: false}
]

function TodoList() {

    const [todos, setTodos] = useState<TodoItemInterface[]>(initialTodos)

    function inputClicked(index: number){
        console.log(index)
        const newTodos = [...todos]
        newTodos[index].completed = !newTodos[index].completed
        setTodos(newTodos)
    }

    return <div id="todo-list-container">
            {todos.map((todoItem, index) => <TodoItem key={todoItem.task} inputClicked={() => inputClicked(index)} task={todoItem.task} completed={todoItem.completed}></TodoItem>)}
        </div>
}

export default TodoList
