import { useEffect, useMemo, useState } from "react"
import { Character } from "../services/Character"
import { useNameGeneratorContext } from "../components/layouts/NameGeneratorContext"
import { useNavigate } from "react-router-dom"
import { CharacterStatics } from "../components/molecules/CharacterStatics"

export const CharacterPage : React.FC = () => {
  const navigate = useNavigate()
  const [characterJSON, setCharacterJSON] = useState<Record<string,any>|null>(null)
  const character = useMemo(()=>{
    if(characterJSON === null) return null
    return Character.FromJSON(characterJSON)
  },[characterJSON])

  const ctx = useNameGeneratorContext()

  useEffect(()=>{
    const json = JSON.parse(window.localStorage.getItem('character') ?? 'null') ?? Character.ToJSON(new Character(0,'',0))
    setCharacterJSON(json)
  },[])

  useEffect(()=>{
    window.localStorage.setItem('character',JSON.stringify(characterJSON))
  },[characterJSON])

  return (
    <div className="">
      <header className="fixed inset-x-0 top-0 bg-gray-800 px-8 py-5 shadow-lg drop-shadow-xl flex justify-between">
        <h1 className="text-3xl font-cubano text-sky-400">Character Page</h1>
        <button onClick={()=>{
          navigate('/init')
        }} className="px-3 py-1 rounded-sm ring-offset-4 ring-offset-gray-800 bg-sky-500 text-white hover:ring-2 hover:ring-sky-500 font-cubano text-lg">HOME</button>
      </header>
      <div className="fixed left-3 inset-y-0 grid content-center">
        <CharacterStatics character={character ?? undefined}/>
      </div>
      <div className="fixed right-3 inset-y-0 grid content-center">
      <div className="bg-gray-800 px-5 py-4 rounded-md border-gray-700 border-2">
        helou
      </div>
      </div>
      <div>
        <span>seleccion de nomre</span>
        <p className="">Character Name: {character?.name}</p>
        <button className="px-3 py-2 border border-white rounded-md" onClick={()=>{
          setCharacterJSON(old=>({
            ...( old ?? {}),
            name: ctx.generateName()
          }))
        }}>random name</button>
      </div>
      

    </div>
  )
}