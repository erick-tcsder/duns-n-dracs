import { useEffect, useMemo, useState } from "react"
import { Character } from "../services/Character"
import { useNameGeneratorContext } from "../components/layouts/NameGeneratorContext"
import { useNavigate } from "react-router-dom"
import { CharacterStatics } from "../components/molecules/CharacterStatics"
import characterURL from '../pictures/character.png'
import characterFemURL from '../pictures/character_fem.png'

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
    window.localStorage.setItem('character',JSON.stringify(Character.ToJSON(character?? new Character(0,'',0))))
  },[character])

  return (
    <div className="">
      <header className="fixed z-50 inset-x-0 top-0 bg-gray-800 px-8 py-5 shadow-lg drop-shadow-xl flex justify-between">
        <h1 className="text-3xl font-cubano text-sky-400">Character Page</h1>
        <button onClick={()=>{
          navigate('/init')
        }} className="px-3 py-1 rounded-sm ring-offset-4 ring-offset-gray-800 bg-sky-500 text-white hover:ring-2 hover:ring-sky-500 font-cubano text-lg">HOME</button>
      </header>
      <div className="fixed z-30 left-3 inset-y-0 grid content-center">
        <CharacterStatics character={character ?? undefined}/>
      </div>
      <div className="fixed z-30 right-3 inset-y-0 grid content-center">
        <div className="bg-gray-800 px-5 py-4 rounded-md border-gray-700 border-2 flex flex-col gap-y-3">
          <button onClick={()=>{
            setCharacterJSON(null)
          }} className="px-3 py-1 rounded-sm ring-offset-4 ring-offset-gray-800 bg-gray-500 text-white hover:ring-2 hover:ring-gray-500 font-cubano text-lg">RESET CHARACTER</button>
          <button onClick={()=>{
            navigate('/game-selection')
          }} className="px-3 py-1 rounded-sm ring-offset-4 ring-offset-gray-800 bg-lime-500 text-white hover:ring-2 hover:ring-lime-500 font-cubano text-lg">START GAME</button>
        </div>
      </div>
      <div className="fixed inset-0 top-16 bottom-0 grid content-end justify-center">
        <div className="relative">
          {character?.gender === 'MALE' && (
            <>
              <div className="absolute animate-pulse bottom-0 right-8 w-48 h-48 bg-orange-500 opacity-80 blur-2xl"></div>
              <div className="absolute animate-pulse bottom-5 right-12 w-32 h-32 bg-yellow-400 opacity-80 blur-2xl"></div>

              <div className="absolute animate-pulse bottom-12 left-0 w-48 h-48 bg-orange-500 opacity-80 blur-2xl"></div>
              <div className="absolute animate-pulse bottom-16 left-8 w-32 h-32 bg-yellow-400 opacity-80 blur-2xl"></div>
              
              <img src={characterURL} className="relative"/>
            </>
          )}
          {character?.gender === 'FEMALE' && (
            <>
              <div className="absolute animate-pulse top-24 right-24 w-32 h-32 bg-gray-100 opacity-50 blur-2xl"></div>
              <div className="absolute animate-pulse top-28 right-28 w-24 h-24 bg-gray-100 opacity-50 blur-2xl"></div>

              <div className="absolute animate-pulse bottom-0 left-28 w-32 h-32 bg-orange-200 opacity-50 blur-2xl"></div>
              <div className="absolute animate-pulse bottom-0 left-28 w-32 h-32 bg-orange-200 opacity-50 blur-2xl"></div>
              
              <img src={characterFemURL} className="relative"/>
            </>
          )}
        </div>
      </div>
      <div className="fixed top-20 inset-x-0 p-5 flex justify-center gap-x-3">
        <p className="my-auto mr-5 font-cubano text-2xl text-white">{character?.name ?? 'Randomize Name'}</p>
        <button className="px-3 py-2 bg-sky-500 text-white rounded-md hover:ring-2 hover:ring-sky-500 font-cubano ring-offset-4 ring-offset-gray-900" onClick={()=>{
          setCharacterJSON(old=>({
            ...( old ?? {}),
            name: ctx.generateName()
          }))
        }}><i className="fas fa-dice text-2xl"/></button>
        <button disabled={characterJSON?.['gender'] === 'MALE'} className="ml-5 px-3 py-2 bg-red-500 text-white rounded-md hover:ring-2 hover:ring-red-500 font-cubano ring-offset-4 ring-offset-gray-900 disabled:bg-gray-900 disabled:ring-inset disabled:ring-offset-0 disabled:ring-2 disabled:ring-red-500 disabled:text-red-500 disabled:cursor-not-allowed" onClick={()=>{
          setCharacterJSON(old=>({
            ...( old ?? {}),
            gender: 'MALE'
          }))
        }}><i className="fas fa-mars text-2xl"/></button>
        <button disabled={characterJSON?.['gender'] === 'FEMALE'} className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:ring-2 hover:ring-yellow-400 font-cubano ring-offset-4 ring-offset-gray-900 disabled:bg-gray-900 disabled:ring-inset disabled:ring-offset-0 disabled:ring-2 disabled:ring-yellow-400 disabled:text-yellow-400 disabled:cursor-not-allowed" onClick={()=>{
          setCharacterJSON(old=>({
            ...( old ?? {}),
            gender: 'FEMALE'
          }))
        }}><i className="fas fa-venus text-2xl"/></button>
      </div>
      

    </div>
  )
}