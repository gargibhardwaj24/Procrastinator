import { use, useEffect, useState } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
 useEffect(() => {
  let todoString = localStorage.getItem("todos");
  if (todoString) {
    let stored = JSON.parse(todoString);
    setTodos(stored);
  }
}, []);


  const saveToLS = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
}


  const handleEdit = (e, id) => {
  let t = todos.filter(i => i.id === id);
  setTodo(t[0].todo);
  let newTodos = todos.filter(i => i.id !== id);
  setTodos(newTodos);
  saveToLS(newTodos);
}
  const handleDelete = (e, id) => {
  if (!confirm("Are you sure you want to delete this task?")) return;
  let newTodos = todos.filter(item => item.id !== id);
  setTodos(newTodos);
  saveToLS(newTodos);
}
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos);
  }
  const handleAdd = () => {
  let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
  setTodos(newTodos);
  setTodo("");
  saveToLS(newTodos);
}
  const handleChange = (e) => {
    setTodo(e.target.value)
    console.log("change happened");
  }
  return (
    <>
      <Navbar />
      <div className="pt-5 h-screen" style={{ backgroundColor: 'beige', }}>
        <div className="addTask rounded-xl bg-green-600/20 m-3 w-xl p-3">
          <h1 className="text-2xl font-bold font-[Nunito] px-5">Add a task</h1>
          <input onChange={handleChange} value={todo} type="text" placeholder="Task details" className="m-3 p-3 rounded-3xl w-96 bg-white" />
          <button onClick={handleAdd} className="bg-green-950/75 text-white font-bold px-5 hover:cursor-pointer py-2 rounded-3xl hover:bg-green-600/30">Save</button>
        </div>
        <div className="tasks bg-green-600/20 m-3 h-7/12 w-5xl rounded-xl px-5">
          <h2 className="heading text-2xl font-bold font-[Nunito] p-3">Your tasks</h2>
          <div className="todos">
            {todos.length === 0 && <div className="noTasks font-[Nunito] p-3">No tasks added yet</div>}
            {todos.map(item => {


              return <div key={item.id} className="todo flex justify-between items-center">
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                <div className="buttons flex justify-center items-center">
                  <input onChange={handleCheckbox} name={item.id}
                    type="checkbox"
                    class="appearance-none h-7 w-7 mx-5 border-2 border-green-700 rounded-md checked:bg-green-950/75 checked:border-green-950/75 transition-all duration-200 cursor-pointer"
                  />
                  <button onClick={(e) => handleEdit(e, item.id)}className="p-2 bg-green-950/75 m-2 rounded-xl hover:cursor-pointer">edit</button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='p-2 bg-green-950/75 m-2 rounded-xl hover:cursor-pointer'>Delete</button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
