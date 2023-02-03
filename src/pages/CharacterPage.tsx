import { useEffect, useMemo, useState } from "react"
import { Character } from "../services/Character"
import { useNameGeneratorContext } from "../components/layouts/NameGeneratorContext"

export const CharacterPage : React.FC = () => {
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
    <div>
      <h1>Character Page</h1>
      <p className="">Character Name: {character?.name}</p>
      <button className="px-3 py-2 border border-white rounded-md" onClick={()=>{
        setCharacterJSON(old=>({
          ...( old ?? {}),
          name: ctx.generateName()
        }))
      }}>random name</button>

    </div>
  )
}