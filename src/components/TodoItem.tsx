import React from 'react'
import styled from 'styled-components'

export interface TodoItemInterface {
    task: string
    completed: boolean
}

interface Props extends TodoItemInterface {
    inputClicked: () => void
}


const TodoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

function TodoItem(props: Props) {

    return <TodoContainer>
            <p>{props.task}</p>
            <input type="checkbox" onClick={props.inputClicked} checked={props.completed} />
            </TodoContainer>
}

export default TodoItem
