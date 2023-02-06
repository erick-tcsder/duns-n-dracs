import { useNavigate } from "react-router-dom"
import biomes from "../services/data/biomes.json"
import { StageCard } from "../components/organisms/StageCard"
import { useCallback, useEffect, useState } from "react"
import { getGame, getUnlocks, setGame, setUnlocks } from "../utils/localStorageUtils"
import Swal from "sweetalert2"
import { Game } from "../services/Game"


type BiomeJSONType = {
  "name": string,
  "description": string,
  "image": string,
  "levels": [number,number]
}

export const GameSelectionPage : React.FC = ()=>{
  const navigate = useNavigate()
  const [unlocksLocal, setUnlocksLocal] = useState<string[]>(getUnlocks())

  useEffect(()=>{
    const game = getGame()
    console.log('game',game)
    if(game && !game.ended){
      Swal.fire({
        title: "Warning",
        text: 'There exists a current game that will be overwritten if you start a new dungeon',
        showCancelButton: true,
        cancelButtonText: 'Lets finish it!',
        confirmButtonText: 'I dont really mind ...'
      }).then(({value})=>{
        if(value){
          game.ended = 'die'
          setGame(game)
        }else{
          navigate('/duns-n-dracs')
        }
      })
    }
  },[])

  const handleStartAGameAndPushToPage = useCallback(async (biome:BiomeJSONType)=>{
    const newGame = new Game(biome.name,biome.levels[0],biome.levels[1])
    await newGame.generateEntities()
    setGame(newGame)
    navigate('/duns-n-dracs')
  },[])
  
  return <div>
    <header className="fixed z-50 inset-x-0 top-0 bg-gray-800 px-8 py-5 shadow-lg drop-shadow-xl flex justify-between">
      <h1 className="text-3xl font-cubano text-sky-400">Duns <span className="text-white text-lg">&</span> <span className="text-red-500">DRACS</span></h1>
      <button onClick={()=>{
        navigate('/init')
      }} className="px-3 py-1 rounded-sm ring-offset-4 ring-offset-gray-800 bg-sky-500 text-white hover:ring-2 hover:ring-sky-500 font-cubano text-lg">HOME</button>
    </header>
    <div className="grid grid-cols-5 fixed top-32 inset-12 bottom-24 gap-12">
      {(biomes as BiomeJSONType[]).map((biome)=>(
        <StageCard key={biome.name} {...biome} stage={biome.name} locked={!Boolean(unlocksLocal?.includes(biome.name))} onClick={()=>{handleStartAGameAndPushToPage(biome)}}/>
      ))}
    </div>
    <div className="fixed bottom-0 left-0">
      <button onClick={()=>{
        setUnlocks(biomes.map(b=>b.name))
        setUnlocksLocal(biomes.map(b=>b.name))
      }}>dev</button>
    </div>
  </div>
}