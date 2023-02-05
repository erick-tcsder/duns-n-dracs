import { getUnlocks } from "./localStorageUtils"

export const initUnlocks = ()=>{
  const unlocks = getUnlocks()
  if((unlocks as string[]).length === 0){
    unlocks.push("Magic Forest")
    localStorage.setItem('unlocks', JSON.stringify(unlocks))
  }
  return unlocks
}