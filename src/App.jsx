import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import WeeklyCalendar from "./components/WeeklyCalendar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { quotes } from "./data/quotes";
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

  const [quote, setQuote] = useState("");
  const generateRandomQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  };

  useEffect(() => {
    generateRandomQuote();
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
    let index = todos.findIndex(item => item.id === id);
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
  }

  return (
    <>
      <Navbar />

      <div className="pt-5 min-h-screen w-full" style={{ backgroundColor: 'beige', }}> 

        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6 px-4">

<div className="flex flex-col gap-6">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    <div className="rounded-xl bg-green-600/20 p-5">
      <h1 className="text-2xl font-bold font-[Nunito]">Add a task</h1>

      <input
        onChange={handleChange}
        value={todo}
        type="text"
        placeholder="Task details"
        className="mt-3 p-3 rounded-3xl w-full bg-white"
      />

      <button
        onClick={handleAdd}
        disabled={todo.length <= 3}
        className="mt-3 bg-green-950/75 disabled:bg-green-950/75 text-white font-bold px-5 py-2 rounded-3xl hover:bg-green-600/30"
      >
        Save
      </button>
    </div>

    <WeeklyCalendar />

  </div>

  <div className="bg-green-600/20 rounded-xl p-5 max-h-[60vh] overflow-y-auto min-h-[500px]">
    <h2 className="text-2xl font-bold font-[Nunito] mb-3">Your tasks</h2>

    {todos.length === 0 && (
      <p className="font-[Nunito]">No tasks added yet</p>
    )}

    {todos.map(item => (
      <div key={item.id} className="todo flex justify-between items-center py-2">
        <div className={item.isCompleted ? "line-through" : ""}>
          {item.todo}
        </div>

        <div className="flex items-center">
          <input
            onChange={handleCheckbox}
            name={item.id}
            type="checkbox"
            checked={item.isCompleted}
            className="appearance-none h-7 w-7 mx-3 border-2 border-green-700 
                       rounded-md checked:bg-green-950/75 checked:border-green-950/75 
                       transition-all cursor-pointer"
          />

          <button
            onClick={(e) => handleEdit(e, item.id)}
            className="p-2 bg-green-950/75 rounded-xl mx-1"
          >
            <FaEdit className="invert" />
          </button>

          <button
            onClick={(e) => handleDelete(e, item.id)}
            className="p-2 bg-green-950/75 rounded-xl mx-1"
          >
            <MdDelete className="invert" />
          </button>
        </div>
      </div>
    ))}
  </div>

</div>


          <div className="bg-green-600/20 rounded-xl shadow-lg p-5 text-center mr-5 flex flex-col justify-between">
            <FaQuoteLeft className="text-4xl text-green-900 mx-auto" />

            <p className="text-2xl font-semibold italic text-green-900 px-5 py-3">
              {quote}
            </p>

            <FaQuoteRight className="text-4xl text-green-900 mx-auto" />
          </div>

        </div>
      </div>
    </>
  )
}

export default App
