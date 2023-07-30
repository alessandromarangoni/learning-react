import { useState } from 'react'
import './App.css'

export default function App(){
  const [newItem, setNewItem] = useState('')
  const [todos, setTodos] = useState([])

  function handleSubmit(e){
    e.preventDefault()

    setTodos(currentTodos => { return [...currentTodos,{id: crypto.randomUUID(), title: newItem, completed: false},] } )
    setNewItem('')
  }

  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id){
          return{...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter((todo)=> {return  todo.id!== id})
    })
  }
  console.log(todos)
  return (
    <>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className='form-row'>
          <label htmlFor='item'>NEW ITEM</label>
          <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" name="" id="item" />
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>To Do</h1>
      <ul className='list'>
        {todos.length === 0 && 'No Todos'}
        {todos.map(todo => { return (
        <li key={todo.id}>
          <label>
            <input type="checkbox" name="{todo.title}" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)} />
            {todo.title}
          </label>
          <button className='btn btn-danger' onClick={()=> deleteTodo(todo.id)}>delete</button>
        </li>
        )
        })}
      </ul>
    </>
  )
}
