import classNames from "classnames";
import { MapRoom, RoomType } from "../../services/Map";

export interface MapIconSquareProps{
  room: MapRoom,
  here?: boolean
}

export const MapIconSquare : React.FC<MapIconSquareProps> = (props)=>{
  return <div className={classNames("aspect-square w-6 max-w-[24px] max-h-[24px] flex rounded-sm",{
    'bg-slate-500': props.room.roomType === RoomType.EMPTY,
    'bg-purple-500': props.room.roomType === RoomType.BOSS,
    'bg-red-500': props.room.roomType === RoomType.HOSTILE,
    'bg-yellow-400': props.room.roomType === RoomType.TREASURE,
    'bg-lime-500': props.room.roomType === RoomType.NPC,
    'opacity-20': !props.room.visited && !props.here
  })}>{props.here && <i className="fas fa-user m-1"/>}</div>
}