
import '../css/createTodo.css'


export default function CreateTodo() {
    let title = '';
    let description = '';

    // fetch all todos from server
    function titleInput(event) {
        title = event.target.value;
        console.log(title)
    }
    function descInput(event) {
        description = event.target.value
        console.log(description)

    }


    function sendData() {
        console.log(title)
        console.log(description)
        console.log("creating your task")
        const todo = { title, description }

        fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo)
        }).then((res) => {

            res.json().then((data) => {
                console.log(data)

            })
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <>
            <div className="createTodo">
                <h2 style={{ color: "blue" }}>Create todo</h2>
                <label htmlFor="title">Title:</label>
                <input className="createInput" type="text" onChange={titleInput} />
                <label htmlFor="description">Description:</label>
                <input className="createInput" type="text" onChange={descInput} />
                <button onClick={sendData}>Submit</button>

            </div>
        </>
    )



}