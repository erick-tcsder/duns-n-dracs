import { useEffect, useMemo, useState } from "react";
import { Character } from "../../services/Character";
import { Game } from "../../services/Game";

export interface DiceLockGameProps {
  game: Game;
  character: Character;
  setSteppingLock: (newL:boolean)=>void;
  setDiceLock: (newL:boolean)=>void;
}

export const DiceLockGame : React.FC<DiceLockGameProps> = (props)=>{
  const [loadingSI,setLoadingSI] = useState<boolean>(true)
  const currentRoom = useMemo(()=>{
    return props.game.map.rooms[props.game.currentPosition.x][props.game.currentPosition.y]
  },[props.game])

  return <div>

  </div>
}