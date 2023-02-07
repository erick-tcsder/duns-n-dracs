import { Character } from "../../services/Character"
import { Game } from "../../services/Game"
import { MapIconSquare } from "../atoms/MapIconSquare"
import { CharacterStatics } from "../molecules/CharacterStatics"


export interface GamePageHudProps {
  character: Character,
  game: Game
}

export const GamePageHud : React.FC<GamePageHudProps> = (props)=>{
  return <div className="fixed bottom-0 inset-x-0 flex justify-between">
    <div className="m-3">
      <CharacterStatics showHP showXp character={props.character ?? undefined}/>
    </div>
    <div className="bg-gray-900 p-3 border-gray-500 border-2 flex flex-col-reverse gap-y-3 m-3 rounded-md self-end">
      {props.game.map.rooms.map((row,x)=>(
        <div key={x} className="flex gap-x-3">
          {row.map((room, y)=>{
            return room ? <MapIconSquare here={props.game.currentPosition.x === x && props.game.currentPosition.y === y} room={room} key={`${x}${y}`}/> : null
          })}
        </div>
      ))}
      <h3 className="font-cubano text-2xl text-sky-400">Map</h3>
    </div>
  </div>
}