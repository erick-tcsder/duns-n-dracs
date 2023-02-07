import { Character } from "../../services/Character";

export interface CharacterStaticsProps {
  character?: Character,
  showXp?: boolean,
  showHP?: boolean
}

export const CharacterStatics : React.FC<CharacterStaticsProps> = ({character,...props})=>{
  return character ? (
    <div className="bg-gray-900 px-5 py-4 rounded-md border-gray-700 backdrop-blur-xl bg-opacity-40 border-2">
      <h3 className="font-cubano text-2xl text-sky-400">Stats</h3>
      <ul className="list-none mt-4">
        <li className="text-lg font-bold text-lime-500"><i className="fas fa-heart mr-2"/>HP <i className="mx-2 fas fa-right-long"/> <span className="text-white">
          {`${props.showHP ? `${Math.floor(character.currentHP)}/${character.maxHP}` : character.maxHP}`}</span></li>
        {props.showXp && (
          <li className="text-lg font-bold text-purple-600"><i className="fas fa-award mr-2"/>XP <i className="mx-2 fas fa-right-long"/> <span className="text-white">{Math.round(character.xp)}/{Math.round(character.nextLevelXp)}</span></li>
        )}
        <li className="text-lg font-bold text-orange-500"><i className="fas fa-crown mr-2"/>LVL <i className="mx-2 fas fa-right-long"/> <span className="text-white">{character?.level}</span></li>
        <li className="text-lg font-bold text-yellow-400"><i className="fas fa-coins mr-2"/>GOLD <i className="mx-2 fas fa-right-long"/> <span className="text-white">{character?.g}</span></li>
        <li className="text-lg font-bold text-red-500"><i className="fas fa-gun mr-2"/>ATK <i className="mx-2 fas fa-right-long"/> <span className="text-white">{Math.round(character?.atk)}</span></li>
        <li className="text-lg font-bold text-gray-300"><i className="fas fa-shield mr-2"/>DEF <i className="mx-2 fas fa-right-long"/> <span className="text-white">{Math.round(character?.def)}</span></li>
      </ul>
    </div>
  ) : null
}