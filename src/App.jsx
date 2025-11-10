import { useState } from 'react'
import Navbar from './components/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
    </>
  )
}

export default App
