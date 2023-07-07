import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateTodo from './components/CreateTodo.jsx'
import ShowTodos from './components/showTodo'









function App() {



  return (
    <>
      <h1>Todos App</h1>
      <CreateTodo></CreateTodo>
      <h2>Show todos</h2>
      <ShowTodos></ShowTodos>



    </>
  )
}


export default App
