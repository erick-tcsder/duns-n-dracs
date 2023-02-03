import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import coverURL from '../pictures/cver.png'

export const InitPage : React.FC = ()=>{
  const characterRef = useRef(JSON.parse(window.localStorage.getItem('character') ?? 'null'))
  const navigate = useNavigate()

  return <div className="grid place-content-center h-full">
    <div className="max-w-2xl h-full w-full flex flex-col gap-y-5 py-12">
      <div className="relative mb-12">
        <img src={coverURL} className="relative rounded-md z-20"/>
        <img src={coverURL} className="absolute rounded-md inset-0 blur-2xl z-10 animate-pulse"/>
      </div>
      <button onClick={()=>{
        navigate('/character')
      }} className="px-6 py-4 rounded-md ring-offset-4 ring-offset-gray-900 bg-red-500 text-white hover:ring-4 hover:ring-red-500 font-cubano text-2xl">NEW GAME</button>
      <button onClick={()=>{
        navigate('/game-selection')
      }} disabled={!Boolean(characterRef.current)} className="px-6 py-4 rounded-md ring-offset-4 ring-offset-gray-900 bg-yellow-400 text-white hover:ring-4 hover:ring-yellow-400 font-cubano text-2xl disabled:opacity-50 disabled:hover:ring-0">CONTINUE</button>
    </div>
  </div>
}