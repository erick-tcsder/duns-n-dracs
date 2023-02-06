import { useNavigate } from "react-router-dom"
import { GamePageHeader } from "../components/organisms/GamePageHeader"
import { useCallback, useEffect, useMemo, useState } from "react"
import { getCharacter, getGame } from "../utils/localStorageUtils"
import { Game } from "../services/Game"
import Swal from "sweetalert2"
import { Character } from "../services/Character"
import { GamePageHud } from "../components/organisms/GamePageHud"
import { MoveOption } from "../components/molecules/MoveOption"
import { Direction } from "../utils/positionUtils"

export const GamePage : React.FC = ()=>{
  const navigate = useNavigate()
  const [localGame, setLocalGame] = useState<Game | null>(getGame())
  const [localCharacter, setLocalCharacter] = useState<Character | null>(getCharacter())
  const [steppingLock,setSteppingLock] = useState(true)
  const [diceLock, setDiceLock] = useState(false)

  const moveOpts = useMemo(()=>{
    if(!localGame) return []
    const opts = localGame.getAndPopulateMoveOptions()
    return opts
  },[localGame])

  const handleMove = useCallback(()=>{

  },[])

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

  const handleSteppingLock = useCallback(()=>{
    
  },[])

  return <div>
    <GamePageHeader/>
    {localGame && localCharacter && (
      <GamePageHud character={localCharacter} game={localGame}/>
    )}
    <div className="inset-x-0 inset-y-24 flex justify-center absolute">
      {localGame && steppingLock && (
        <div className="max-w-3xl mx-24 w-full h-full grid grid-cols-3 gap-x-4">
          <div className=" flex flex-col justify-center">
            <MoveOption mo={moveOpts.find(r=>r.direction===Direction.Left)}/>
          </div>
          <div className="flex flex-col justify-center gap-y-4">
            <MoveOption mo={moveOpts.find(r=>r.direction===Direction.Top)}/>
            <MoveOption mo={moveOpts.find(r=>r.direction===Direction.Down)}/>
          </div>
          <div className="flex flex-col justify-center">
            <MoveOption mo={moveOpts.find(r=>r.direction===Direction.Right)}/>
          </div>
        </div>
      )}
    </div>
  </div>
}