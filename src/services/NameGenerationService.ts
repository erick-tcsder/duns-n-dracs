import random from 'random'
import { getRandomFromDistroArray } from '../utils/randomUtils'
import { getLetterFromIndex, getLetterIndex } from '../utils/stringUtils'
import PersonNames from './data/names.json'



export class NameGenerationService {
  names: string[] = []
  awareness: number = 3
  transitionMatrix: number[][]
  dictionarySize: number = 26
  randomizer: ()=>number = random.uniform(0,1)
  wordSizeRandomizer: ()=>number = random.normal(7,1)

  constructor(awareness: number = 3, trainOnInit: boolean = false){
    const names = PersonNames
    this.names = names.map((name: string) => name.toLowerCase()).filter((name: string) => name.match(/^[a-z]+$/))
    this.awareness = awareness
    this.transitionMatrix = []
    if(trainOnInit){
      this.trainHMM()
    }
  }

  public trainHMM(){
    if(this.transitionMatrix.length > 0) return
    const matrix = new Array((this.dictionarySize+1)**this.awareness).fill(0).map(() => new Array(this.dictionarySize+1).fill(0))
    this.names.forEach((name,nameIndex)=>{
      let currentStatus = 0
      const nameArray = name.split('')
      nameArray.forEach((letter)=>{
        const lIndex = getLetterIndex(letter)
        const oldRemaining = currentStatus % ((this.dictionarySize+1)**(this.awareness-1))
        matrix[currentStatus][lIndex]++
        currentStatus = oldRemaining * (this.dictionarySize+1) + lIndex
      })
    })
    for(let i = 0; i < matrix.length; i++){
      const row = matrix[i]
      const sum = row.reduce((a,b)=>a+b,0)
      if(sum === 0){
        matrix[i] = [...matrix[0]]
      }else{
        for(let j = 0; j < row.length; j++){
          row[j] /= sum
        }
      } 
    }
    this.transitionMatrix = matrix
    return
  }

  public generateWord(wordSize?: number){
    if(!this?.transitionMatrix) throw new Error('Model must be trained first. Please run `trainHMM`')
    if(!wordSize) wordSize = Math.round(this.wordSizeRandomizer())
    let w = ''
    let currentState = 0
    for(let i=0; i < wordSize; i++){
      const distro = this.transitionMatrix[currentState]
      const nextLetterIndex = getRandomFromDistroArray(distro,this.randomizer)
      if(nextLetterIndex === 0) break
      w += getLetterFromIndex(nextLetterIndex)
      currentState = ( currentState % ((this.dictionarySize+1)**(this.awareness-1)) ) * (this.dictionarySize+1) + nextLetterIndex
    }
    return w
  }

  public generateWordArray(size:number){
    return new Array(size).fill(0).map(()=>this.generateWord(Math.round(this.wordSizeRandomizer())))
  }
}