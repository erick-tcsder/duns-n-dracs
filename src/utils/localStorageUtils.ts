export const getUnlocks = () => {
  const unlocks = JSON.parse(localStorage.getItem('unlocks') || '[]')
  return unlocks
}

export const setUnlocks = (unlocks: string[]) => {
  localStorage.setItem('unlocks', JSON.stringify(unlocks))
}