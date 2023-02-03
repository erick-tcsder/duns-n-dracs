import { useRef } from "react"
import { useNavigate } from "react-router-dom"

export const InitPage : React.FC = ()=>{
  const characterRef = useRef(JSON.parse(window.localStorage.getItem('character') ?? 'null'))
  const navigate = useNavigate()

  return <div className="flex flex-row justify-center h-full">
    <div className="max-w-xl h-full w-full flex flex-col gap-y-5 py-12">
      <button onClick={()=>{
        navigate('/character')
      }} className="px-6 py-4 rounded-md ring-offset-4 ring-offset-gray-900 bg-red-500 text-white hover:ring-4 hover:ring-red-500 font-cubano text-2xl">NEW GAME</button>
      <button disabled={!Boolean(characterRef.current)} className="px-6 py-4 rounded-md ring-offset-4 ring-offset-gray-900 bg-yellow-400 text-white hover:ring-4 hover:ring-yellow-400 font-cubano text-2xl disabled:opacity-50 disabled:hover:ring-0">CONTINUE</button>
    </div>
  </div>
}