import classNames from "classnames"
import { MoveOptionType } from "../../utils/positionUtils"
import { MapRoom, RoomType } from "../../services/Map"



export interface MoveOptionProps {
  mo?: MoveOptionType & {room: MapRoom|null}
}

export const roomColor : Record<RoomType,string> = {
  [RoomType.EMPTY]: "bg-slate-500",
  [RoomType.BOSS]: "bg-purple-500",
  [RoomType.HOSTILE]: "bg-red-500",
  [RoomType.NPC]: "bg-lime-500",
  [RoomType.TREASURE]: "bg-yellow-500",
}

export const roomShadow : Record<RoomType,string> = {
  [RoomType.EMPTY]: "hover:shadow-slate-500",
  [RoomType.BOSS]: "hover:shadow-purple-500",
  [RoomType.HOSTILE]: "hover:shadow-red-500",
  [RoomType.NPC]: "hover:shadow-lime-500",
  [RoomType.TREASURE]: "hover:shadow-yellow-500",
}

export const roomIcon : Record<RoomType,string> = {
  [RoomType.EMPTY]: "fas fa-heart",
  [RoomType.BOSS]: "fas fa-skull",
  [RoomType.HOSTILE]: "fas fa-skull",
  [RoomType.NPC]: "fas fa-user",
  [RoomType.TREASURE]: "fas fa-coins",
}

export const MoveOption : React.FC<MoveOptionProps> = (props) => {
  return (
    <div className={classNames("w-full relative bg-slate-700 border-2 border-slate-600 rounded-lg group p-5",{
      "hover:cursor-pointer hover:shadow-lg": props.mo,
      [roomShadow[props?.mo?.room?.roomType ?? RoomType.EMPTY]]: props.mo,
      "opacity-20": !props.mo,
    })}>
      {props?.mo?.room?.roomType && [RoomType.BOSS,RoomType.HOSTILE,RoomType.NPC].includes(props?.mo?.room?.roomType) && (
        <div className={classNames("absolute top-0 right-0 grid place-items-center px-2 translate-x-1/2 -translate-y-1/2 border-2 rounded-full overflow-hidden",{
          "border-orange-400 bg-orange-500": !props.mo.room.visited,
          "border-lime-400 bg-lime-500": props.mo.room.visited,
        })}>lvl {props.mo.room.roomLevel}</div>
      )}
      <div className="flex justify-center">
        <div className={classNames('aspect-square p-5 rounded-full relative grid place-content-center text-2xl',!props.mo ? 'bg-gray-700' : roomColor[props?.mo.room?.roomType ?? RoomType.EMPTY])}>
          <span className={classNames('absolute -inset-3 animate-pulse rounded-full blur-xl',props.mo ? roomColor[props?.mo.room?.roomType ?? RoomType.EMPTY] : 'bg-gray-700')}/>
          <i className={classNames('relative bg-gra',props.mo ? roomIcon[props?.mo.room?.roomType ?? RoomType.EMPTY] : 'fas fa-lock')}/>
        </div>
      </div>
      {props.mo ? (<div className="flex flex-col">
        <div className="font-cubano text-2xl text-center mt-2">{props.mo.room?.roomType}</div>
      </div>) : null}
    </div>
  )
}