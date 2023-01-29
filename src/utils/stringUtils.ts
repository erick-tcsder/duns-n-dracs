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
