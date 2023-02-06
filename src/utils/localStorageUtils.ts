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