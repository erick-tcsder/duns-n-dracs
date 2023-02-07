import { useCallback, useEffect, useMemo, useState } from "react";
import { Character } from "../../services/Character";
import { Game } from "../../services/Game";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import biomes from '../../services/data/biomes.json'
import { getCharacter, getGame, getUnlocks, setCharacter, setGame, setUnlocks } from "../../utils/localStorageUtils";

export interface DiceLockGameProps {
  game: Game;
  character: Character;
  setSteppingLock: (newL:boolean)=>void;
  setDiceLock: (newL:boolean)=>void;
  setLocalCharacter: (c:Character)=>void;
  setLocalGame: (g:Game)=>void
}

export const DiceLockGame : React.FC<DiceLockGameProps> = (props)=>{
  const navigate = useNavigate()
  const currentRoom = useMemo(()=>{
    return props.game.map.rooms[props.game.currentPosition.x][props.game.currentPosition.y]
  },[props.game])
  const [loading,setLoading] = useState(false)
  const [continueLock,setContinueLock] = useState(false)
  const [res,setRes] = useState<any>(null)

  const handleRoll = useCallback(async ()=>{
    setLoading(true)
    setContinueLock(false)
    const res = await props.game.endRoom(props.character)
    setRes(res)
    if(res.dead) props.character.currentHP = props.character.maxHP
    setCharacter(props.character)
    const c = getCharacter()
    if(c) props.setLocalCharacter(c)
    setGame(props.game)
    const g = getGame()
    if(g) props.setLocalGame(g)
    if(res.dead){
      await Swal.fire({
        title: 'You died',
        text: "A hostile creature killed you",
        icon: 'info',
        timer: 2000,
        showConfirmButton: false
      })
      navigate('/game-selection')
    }
    if(res.win){
      await Swal.fire({
        title: "Congratulations",
        text: "You just won this stage. Now you can try harder dungeons",
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
      const newBiomeI = biomes.findIndex(b=>b.name === props.game.biome) + 1
      const unlocks = getUnlocks()
      if(unlocks && unlocks[unlocks.length - 1] === props.game.biome && unlocks.length < biomes.length){
        setUnlocks([...unlocks, biomes[newBiomeI].name])
      }
      await Swal.fire({
        title: 'You won',
        text: 'You just unlocked '+ biomes[newBiomeI].name,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      })
      navigate('/game-selection')
    }
    setContinueLock(true)
    setLoading(false)
  },[props])

  return <div className="max-w-3xl mx-24 w-full h-full flex flex-col bg-gray-700 bg-opacity-25 backdrop-blur-sm border-2 rounded-lg px-8 py-5">
    <span className="text-2xl font-cubano mb-3 inline-flex text-sky-400">Dungeon Master:</span>
    <p className="text-lg opacity-60">{currentRoom?.startingStory}</p>
    {loading ? (
      <div className="mt-auto flex justify-center">
        <span className=" bg-gray-700 border-2 border-gray-500 flex px-5 py-3 rounded-lg text-xl font-cubano gap-x-3 justify-items-center items-center">
          Waiting for the Dungeon Master {' '}
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      </div>
    ) : (
      <>
        {continueLock ? (
          <>
            <span className="text-2xl font-cubano mb-3 mt-5 inline-flex text-sky-400">{props.character.name}:</span>
            <p className="text-lg opacity-60">{res.diceResult}</p>

            <span className="text-2xl font-cubano mb-3 mt-5 inline-flex text-sky-400">Dungeon Master:</span>
            <p className="text-lg opacity-60">{res.endStory}</p>
            
            <div className="mt-auto flex justify-center">
              <button onClick={()=>{props.setDiceLock(false);props.setSteppingLock(true)}} className="px-6 py-5 text-3xl flex flex-col items-center border-lime-400 border-2 hover:shadow-lg hover:shadow-lime-400 bg-lime-600 bg-opacity-30 rounded-md">
                <span className="text-lg font-cubano"> Continue </span>
              </button> 
            </div>
          </>
        ) : (
          <div className="mt-auto flex justify-center">
            <button onClick={handleRoll} className="px-6 py-5 text-3xl flex flex-col items-center border-sky-400 border-2 hover:shadow-lg hover:shadow-sky-400 bg-sky-600 bg-opacity-30 rounded-md">
              <i className="fas fa-dice-d20"/>
              <span className="text-lg font-cubano mt-1"> Roll it out! </span>
            </button>
          </div>
        )}
      </>
    )}
  </div>
}