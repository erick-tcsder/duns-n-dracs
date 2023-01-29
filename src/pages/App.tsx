import { useState } from 'react'
import { useNameGeneratorContext } from '../components/layouts/NameGeneratorContext'
import config from '../config'

function App() {
  const {
    generateName
  } = useNameGeneratorContext()
  const [name,setName] = useState('')
  return (
    <div className="">
      {config.NAME}
      {name}
      <button onClick={()=>{setName(generateName())}}>generate</button>
    </div>
  )
}

export default App
