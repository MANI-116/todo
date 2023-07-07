import Todo from "./Todo";
import { useState } from 'react'

export default function ShowTodos() {

    const [todos, setTodos] = useState([]);

    function display() {
        fetch('http://localhost:3000/todos').then((res) => {
            res.json().then((data) => {




                setTodos(data.map((work) => <Todo
                    key={work.id}
                    title={work.title}
                    description={work.description}
                    completed={work.completed}
                    id={work.id}
                ></Todo>))
            })
        })

    }



    return (
        <>
            <button onClick={display}>SHOW TODOS</button>
            <p>{todos}</p>
        </>
    )
}