import { useNavigate } from "react-router-dom"

export const GamePageHeader = ()=>{
  const navigate= useNavigate()
  return (
    <header className="fixed z-50 inset-x-0 top-0 bg-gray-800 px-8 py-5 shadow-lg drop-shadow-xl flex justify-between">
      <h1 className="text-3xl font-cubano text-sky-400">Duns <span className="text-white text-lg">&</span> <span className="text-red-500">DRACS</span></h1>
      <div className="flex gap-x-3">
        <button onClick={()=>{
          navigate('/init')
        }} className="px-3 py-1 rounded-sm ring-offset-4 ring-offset-gray-800 bg-sky-500 text-white hover:ring-2 hover:ring-sky-500 font-cubano text-lg">HOME</button>
        <button onClick={()=>{
          navigate('/init')
        }} className="px-3 py-1 rounded-sm ring-offset-4 ring-offset-gray-800 bg-orange-400 text-white hover:ring-2 hover:ring-orange-400 font-cubano text-lg">Exit Dungeon</button>
      </div>
    </header>
  )
}