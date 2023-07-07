/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');
//const fs= require('fs');


const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let todos = [];

//retrieve all to todos

app.get('/todos', getTodos)

//retrieve particular todo by id
app.get('/todos/:id', retrieveTodoById)

//create a new todo
app.post('/todos', createTodo)


//update an existing todo by id
app.put('/todos/:id', updateTodo)

//delete a todo by an id
app.delete('/todos/:id', deleteTodo)

function getTodos(req, res) {
  res.status(200).send(todos)
}


function createTodo(req, res) {
  let id = todos.length + "";
  const { title, description } = req.body;
  let completed = false;
  todos.push({ id, title, description, completed });
  console.log(todos)

  res.status(201).send({ "id": id });
}

function retrieveTodoById(req, res) {
  const id = req.params.id;

  const todo = todos.filter((todo) => { return todo.id === id })
  console.log(todo)
  if (todo[0])
    res.status(200).send(todo[0])
  else
    res.status(404).send("wrong id");
}

function updateTodo(req, res) {
  const id = req.params.id;
  let n = todos.length;
  let todo;
  let updated = false;
  for (let i = 0; i < n; i++) {
    if (todos[i].id === id) {
      updated = true;
      let { title, completed } = req.body;
      todos[i].completed = completed;
      todos[i].title = title;
      todo = todos[i];
      break;
    }
  }
  console.log(todo);
  if (updated)

    res.status(200).send(todo);
  else

    res.status(404).send("not updated");


}

function deleteTodo(req, res) {
  const id = req.params.id;
  let found = false;

  todos = todos.filter((todo) => {
    if (todo.id === id)
      found = true;
    return todo.id !== id
  });

  console.log(found)

  if (found)
    res.send("deleted");
  else
    res.status(404).send("not found");

}

app.listen(3000, () => {
  console.log("server is ready to serve")
})

