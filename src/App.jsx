
export default function App(){
  // Definizione dello stato per il nuovo elemento e la lista di tutti gli elementi
  const [newItem, setNewItem] = useState('')
  const [todos, setTodos] = useState([])

  // Funzione per gestire l'invio del form per aggiungere un nuovo elemento
  function handleSubmit(e){
    e.preventDefault()

    // Aggiunge il nuovo elemento alla lista dei todo utilizzando la funzione di setTodos con l'uso della callback
    setTodos(currentTodos => {
      return [...currentTodos, { id: crypto.randomUUID(), title: newItem, completed: false }]
    })
    // Resetta il campo del nuovo elemento dopo l'aggiunta
    setNewItem('')
  }

  // Funzione per cambiare lo stato "completed" di un todo specifico
  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      // Mappa tutti i todo presenti e cambia lo stato "completed" solo per quello con l'id corrispondente
      return currentTodos.map(todo => {
        if (todo.id === id){
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  // Funzione per eliminare un todo con un id specifico dalla lista
  function deleteTodo(id){
    setTodos(currentTodos => {
      // Filtra i todo per escludere quello con l'id corrispondente
      return currentTodos.filter((todo)=> {return  todo.id!== id})
    })
  }

  // Stampa la lista dei todo nel log della console
  console.log(todos)

  // Rendering del componente
  return (
    <>
      {/* Form per l'aggiunta di un nuovo todo */}
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className='form-row'>
          <label htmlFor='item'>NEW ITEM</label>
          {/* Input controllato dallo stato "newItem" */}
          <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" name="" id="item" />
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>To Do</h1>
      <ul className='list'>
        {/* Mostra un messaggio se la lista dei todo è vuota */}
        {todos.length === 0 && 'No Todos'}
        {/* Mappa tutti i todo nella lista e mostra ciascuno di essi */}
        {todos.map(todo => { return (
          <li key={todo.id}>
            {/* Checkbox controllata dallo stato "completed" del todo */}
            <label>
              <input type="checkbox" name="{todo.title}" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)} />
              {todo.title}
            </label>
            {/* Bottone per eliminare il todo */}
            <button className='btn btn-danger' onClick={()=> deleteTodo(todo.id)}>delete</button>
          </li>
        )})}
      </ul>
    </>
  )
}
