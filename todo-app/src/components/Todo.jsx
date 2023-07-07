
import '../css/todo.css'
export default function Todo(props) {



    function deleteTask() {

        fetch('http://localhost:3000/todos/' + props.id, {
            method: 'DELETE'
        }).then((res) => {

            res.text().then((data) => {
                console.log(data)
            })


        })

    }
    let status = props.completed === true ? "Completed" : "Not Completed"

    return (<>
        <div className="todoBox">

            <div className="description-box">
                <span id="title"> <b>{props.title}</b></span>
                <br></br>
                <span>{props.description}</span>
            </div>

            <div className="buttons">
                <button >{status}</button>
                <button onClick={deleteTask}>DELETE</button>
            </div>

        </div>

    </>)
}