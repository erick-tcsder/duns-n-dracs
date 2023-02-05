import { LandscapeImage } from "../atoms/LandscapeImage";


export interface StageCardProps {
  stage: string;
  description: string;
  unlocked: boolean;
  image: string;
  onClick: () => void;
}

export const StageCard : React.FC<StageCardProps> = (props)=>{
  return (
    <div className="flex flex-col relative overflow-hidden rounded-2xl border-4 border-gray-700 bg-gray-800">
      <LandscapeImage stage={props.image} portrait backBlured/>
      <div className="relative font-cubano text-3xl flex flex-col h-full pb-3 mt-3">
        <div className="flex justify-center">
          {props.stage}
        </div>
        <p className="text-base font-poppins opacity-70 text-center px-5 mt-3">{props.description}</p>
        <button onClick={()=>{}} className="mt-auto mx-3 px-3 py-1 rounded-md ring-offset-4 ring-offset-gray-800 bg-sky-500 text-white hover:ring-2 hover:ring-sky-500 font-cubano text-lg">Play</button>
      </div>
    </div>
  )
}