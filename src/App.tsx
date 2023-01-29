import { useState } from 'react'
import { useNameGeneratorContext } from './components/layouts/NameGeneratorContext'

function App() {
  const {
    generateName
  } = useNameGeneratorContext()
  const [name,setName] = useState('')
  return (
    <div className="">
      {name}
      <button onClick={()=>{setName(generateName())}}>generate</button>
    </div>
  )
}

export default App
