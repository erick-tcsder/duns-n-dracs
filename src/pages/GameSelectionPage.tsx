import { useNavigate } from "react-router-dom"
import biomes from "../services/data/biomes.json"
import { StageCard } from "../components/organisms/StageCard"


type biomeJSON = {
  "name": string,
  "description": string,
  "image": string,
  "levels": [number,number]
}

export const GameSelectionPage : React.FC = ()=>{
  const navigate = useNavigate()
  
  return <div>
    <header className="fixed z-50 inset-x-0 top-0 bg-gray-800 px-8 py-5 shadow-lg drop-shadow-xl flex justify-between">
      <h1 className="text-3xl font-cubano text-sky-400">Duns <span className="text-white text-lg">&</span> <span className="text-red-500">DRACS</span></h1>
      <button onClick={()=>{
        navigate('/init')
      }} className="px-3 py-1 rounded-sm ring-offset-4 ring-offset-gray-800 bg-sky-500 text-white hover:ring-2 hover:ring-sky-500 font-cubano text-lg">HOME</button>
    </header>
    <div className="grid grid-cols-5 fixed top-32 inset-12 bottom-24 gap-12">
      {(biomes as biomeJSON[]).map((biome)=>(
        <StageCard {...biome} stage={biome.name} locked={biome.name[0] === 'V'} onClick={()=>{}}/>
      ))}
    </div>
  </div>
}