import { Character } from "../services/Character"
import { Game } from "../services/Game"

export const getUnlocks = () => {
  const unlocks = JSON.parse(localStorage.getItem('unlocks') || '[]')
  return unlocks
}

export const setUnlocks = (unlocks: string[]) => {
  localStorage.setItem('unlocks', JSON.stringify(unlocks))
}

export const setGame = (game: Game) => {
  localStorage.setItem('game', JSON.stringify(game.toJSON()))
}

export const getGame = () => {
  const game = localStorage.getItem('game')
  if(!game) return null
  return Game.fromJSON(JSON.parse(game))
}

export const setCharacter = (ch:Character)=>{
  localStorage.setItem('character', JSON.stringify(Character.ToJSON(ch)))
}

export const getCharacter = ()=>{
  const ch = localStorage.getItem('character')
  if(!ch) return null
  return Character.FromJSON(JSON.parse(ch))
}

export const getDeveloperMode = ()=>{
  const dev = localStorage.getItem('developerMode')
  if(!dev) return false
  return dev === 'true'
}

export const setDeveloperMode = (dev:boolean)=>{
  localStorage.setItem('developerMode', dev.toString())
}