import classnames from 'classnames'


export const getLetterIndex = (letter: string)=>{
  if(letter.length > 1 ) throw new Error('Letter must be a single character')
  if(letter === '^') return 0
  return letter.charCodeAt(0) - 'a'.charCodeAt(0) + 1
}

export const getLetterFromIndex = (index: number)=>{
  if(index > 26 || index < 0) throw new Error('Index doesn\'t correspond to a letter')
  if(index === 0) return '^'
  return String.fromCharCode(index - 1 + 'a'.charCodeAt(0))
}

export const diceResultFromDiff = (dif:number)=>{
  return classnames({
    'easily wins': dif >= 10,
    'wins': dif >= 5 && dif < 10,
    'barely wins': dif > 0 && dif < 5,
    'draw': dif === 0,
    'barely loses': dif < 0 && dif > -5,
    'loses': dif <= -5 && dif > -10,
    'easily loses': dif <= -10 && dif > -15,
    'dies': dif <= -15,
  })
}