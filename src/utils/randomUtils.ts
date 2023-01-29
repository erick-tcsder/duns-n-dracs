import random from 'random'

export const getRandomFromDistroArray = (distros:number[],randomizer:()=>number)=>{
  const sum = distros.reduce((a,b)=>a+b,0)
  if((sum - 1) > 0.0001 || (sum - 1) < -0.0001) throw new Error('Distro array must sum to 1')
  const rand = 1 - randomizer()
  let sumSoFar = 0
  for(let i = 0; i < distros.length; i++){
    sumSoFar += distros[i]
    if(rand <= sumSoFar) return i
  }
  return distros.length - 1
}