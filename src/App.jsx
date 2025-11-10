import { useState } from 'react'
import Navbar from './components/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className="pt-5" style={{ backgroundColor: 'beige', height: screen.height }}>
        <div className="tasks bg-green-600/20 mx-4 w-5xl rounded-xl px-5"> 
        <div className="heading text-2xl font-bold font-[Nunito] p-3">Your tasks</div>
        </div>
      </div>
    </>
  )
}

export default App
