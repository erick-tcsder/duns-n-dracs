import { Character } from "../../services/Character";

export interface CharacterStaticsProps {
  character?: Character
}

export const CharacterStatics : React.FC<CharacterStaticsProps> = ({character})=>{
  return character ? (
    <div className="bg-gray-800 px-5 py-4 rounded-md border-gray-700 border-2">
      <h3 className="font-cubano text-2xl text-sky-400">Statistics</h3>
      <ul className="list-none mt-4">
        <li className="text-lg font-bold text-lime-500"><i className="fas fa-heart mr-2"/>HP <i className="mx-2 fas fa-right-long"/> <span className="text-white">{character?.maxHP}</span></li>
        <li className="text-lg font-bold text-orange-500"><i className="fas fa-crown mr-2"/>LVL <i className="mx-2 fas fa-right-long"/> <span className="text-white">{character?.level}</span></li>
        <li className="text-lg font-bold text-yellow-400"><i className="fas fa-coins mr-2"/>GOLD <i className="mx-2 fas fa-right-long"/> <span className="text-white">{character?.g}</span></li>
        <li className="text-lg font-bold text-red-500"><i className="fas fa-gun mr-2"/>ATK <i className="mx-2 fas fa-right-long"/> <span className="text-white">{character?.atk}</span></li>
        <li className="text-lg font-bold text-gray-300"><i className="fas fa-shield mr-2"/>DEF <i className="mx-2 fas fa-right-long"/> <span className="text-white">{character?.def}</span></li>
      </ul>
    </div>
  ) : null
}