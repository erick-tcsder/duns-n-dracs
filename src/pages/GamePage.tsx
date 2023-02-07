import { useNavigate } from "react-router-dom"
import { GamePageHeader } from "../components/organisms/GamePageHeader"
import { useCallback, useEffect, useMemo, useState } from "react"
import { getCharacter, getGame, setGame } from "../utils/localStorageUtils"
import { Game } from "../services/Game"
import Swal from "sweetalert2"
import { Character } from "../services/Character"
import { GamePageHud } from "../components/organisms/GamePageHud"
import { MoveOption, MoveOptionProps } from "../components/molecules/MoveOption"
import { Direction, MoveOptionType } from "../utils/positionUtils"
import { MapRoom } from "../services/Map"
import { DiceLockGame } from "../components/organisms/DiceLockGame"
import characterURL from '../pictures/character.png'
import characterFemURL from '../pictures/character_fem.png'

export const GamePage : React.FC = ()=>{
  const navigate = useNavigate()
  const [localGame, setLocalGame] = useState<Game | null>(getGame())
  const [localCharacter, setLocalCharacter] = useState<Character | null>(getCharacter())
  const [steppingLock,setSteppingLock] = useState(true)
  const [diceLock, setDiceLock] = useState(false)
  const [loading,setLoading] = useState(false)

  const moveOpts = useMemo(()=>{
    if(!localGame) return []
    const opts = localGame.getAndPopulateMoveOptions()
    return opts
  },[localGame])

  useEffect(()=>{
    if(!localGame || !localCharacter) {
      Swal.fire({
        title: 'Error',
        text: "You shouldn't be here",
        icon: 'error',
        confirmButtonText: 'Go back to home'
      }).then(()=>{
        navigate('/init')
      })
    }
  })

  const handleStep = useCallback(async (mo?:MoveOptionType & {room: MapRoom|null})=>{
    if(!localGame || !localCharacter || !mo || !mo.room) return
    setLoading(true)
    const wasVisited = await localGame.visitRoom(mo.room, mo.pos, localCharacter.name)
    setGame(localGame)
    setLocalGame(getGame())
    if(!wasVisited){
      setSteppingLock(false)
      setDiceLock(true)
    }
    setLoading(false)
  },[])

  return <div>
    <div className="fixed inset-0 top-16 bottom-0 grid content-end justify-start">
      <div className="relative" style={{transform: 'scaleX(-1)',WebkitTransform: 'scaleX(-1)'}}>
        {localCharacter?.gender === 'MALE' && (
          <>
            <div className="absolute animate-pulse bottom-0 right-8 w-48 h-48 bg-orange-500 opacity-80 blur-2xl"></div>
            <div className="absolute animate-pulse bottom-5 right-12 w-32 h-32 bg-yellow-400 opacity-80 blur-2xl"></div>

            <div className="absolute animate-pulse bottom-12 left-0 w-48 h-48 bg-orange-500 opacity-80 blur-2xl"></div>
            <div className="absolute animate-pulse bottom-16 left-8 w-32 h-32 bg-yellow-400 opacity-80 blur-2xl"></div>
            
            <img src={characterURL} className="relative"/>
          </>
        )}
        {localCharacter?.gender === 'FEMALE' && (
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
    <GamePageHeader/>
    {localGame && localCharacter && (
      <GamePageHud character={localCharacter} game={localGame}/>
    )}
    <div className="inset-x-0 inset-y-24 flex justify-center absolute">
      {loading ? (
        <div className="grid place-content-center">
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
          {localGame && steppingLock && (
            <div className="max-w-3xl mx-24 w-full h-full grid grid-cols-3 gap-x-4">
              <div className=" flex flex-col justify-center">
                <MoveOption onClick={handleStep} mo={moveOpts.find(r=>r.direction===Direction.Left)}/>
              </div>
              <div className="flex flex-col justify-center gap-y-4">
                <MoveOption onClick={handleStep} mo={moveOpts.find(r=>r.direction===Direction.Top)}/>
                <MoveOption onClick={handleStep} mo={moveOpts.find(r=>r.direction===Direction.Down)}/>
              </div>
              <div className="flex flex-col justify-center">
                <MoveOption onClick={handleStep} mo={moveOpts.find(r=>r.direction===Direction.Right)}/>
              </div>
            </div>
          )}
          {diceLock && localCharacter && localGame && (
            <DiceLockGame setLocalCharacter={setLocalCharacter} setLocalGame={setLocalGame} character={localCharacter} game={localGame} setDiceLock={setDiceLock} setSteppingLock={setSteppingLock}/>
          )}
        </>
      )}
    </div>
  </div>
}