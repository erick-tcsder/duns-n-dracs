import rand from 'random'
import { StoryService } from './cohere/StoryService'


export type Coordinate = {
  x: number,
  y: number
}

enum RoomType{
  EMPTY,
  HOSTILE,
  NPC,
  BOSS,
  TREASURE
}

export class MapRoom{
  public visited = false
  public startingStory = ''
  public endingStory = ''
  public roomType: RoomType
  public roomLevel: number
  public biome: string

  constructor(roomType: RoomType, roomLevel: number, biome: string){
    this.roomType = roomType
    this.roomLevel = roomLevel
    this.biome = biome
  }

  public async getStartingStory(character: string, entity:string){
    switch(this.roomType){
      case RoomType.BOSS:
      case RoomType.HOSTILE:
      case RoomType.NPC:
        if(!entity) throw new Error('No entity provided')
        this.startingStory = await StoryService.generateStoryStart(this.biome,character,MapRoom.getCardFromRoomType(this.roomType),entity)
        return this.startingStory
      case RoomType.EMPTY:
        this.startingStory = `${character} finds himself in front of an empty room and ...`
        return this.startingStory
      case RoomType.TREASURE:
        this.startingStory = `${character} enters a room full of richness and treasures and ...`
        return this.startingStory
      default:
        throw new Error('No valid room type')
    }
    return this.startingStory
  }

  static getCardFromRoomType(rt:RoomType){
    switch(rt){
      case RoomType.BOSS:
        return 'boss'
      case RoomType.EMPTY:
        return 'empty room'
      case RoomType.HOSTILE:
        return 'hostile'
      case RoomType.NPC:
        return 'npc'
      case RoomType.TREASURE:
        return 'treasure'
    }
  }
}

export class Map{
  public rooms: (MapRoom | null)[][]
  public mapName: string
  public startingRoom: Coordinate
  public biome:string
  constructor(name:string, biome:string, x:number, y:number, dificulty: (x:number,y:number)=>{
    minLevel: number;
    maxLevel: number;
    npcRatio: number;
    bossRooms: number;
    treasureRatio: number;
    voidRatio: number;
  }){
    const uniform = rand.uniformInt(1,x*y)
    const bossUIntX = rand.uniformInt(Math.round(x/2),x)
    const bossUIntY = rand.uniformInt(Math.round(y/2),y)
    this.mapName = name
    this.biome = biome
    this.startingRoom = {x:0,y:0}
    const dif = dificulty(x,y)

    const bossRooms = Array.from({ length: dif.bossRooms }, (v, i) => new MapRoom(RoomType.BOSS, dif.maxLevel, this.biome))
    const treasureRooms = Array.from({ length: Math.round(x*y*dif.treasureRatio) }, (v, i) => new MapRoom(RoomType.TREASURE, Math.round(Math.random() * (dif.maxLevel - dif.minLevel) + dif.minLevel), this.biome))
    const voidRooms = Array.from({ length: Math.round(x*y*dif.voidRatio) }, (v, i) => new MapRoom(RoomType.EMPTY, 0, this.biome))
    const npcRooms = Array.from({ length: Math.round( x*y*dif.npcRatio )}, (v, i) => new MapRoom(RoomType.NPC, Math.round(Math.random() * (dif.maxLevel - dif.minLevel) + dif.minLevel), this.biome))

    this.rooms = Array.from({ length: x }, v => Array.from({ length: y }, v => null))
    this.rooms[0][0] = new MapRoom(RoomType.EMPTY, 0, this.biome)
    bossRooms.forEach(room => {
      while(true){
        const x = bossUIntX()
        const y = bossUIntY()
        
        if(this.rooms[x][y] === null){ 
          this.rooms[x][y] = room
          break
        }
      }
    })
    const espRooms = [...treasureRooms, ...voidRooms, ...npcRooms]
    espRooms.forEach(room => {
      while(true){
        const pos = uniform()
        const x_c = pos%x
        const y_c = Math.floor(pos/x)
        
        if(this.rooms[x_c][y_c] === null){ 
          this.rooms[x_c][y_c] = room
          break
        }
      }
    })
    this.rooms.forEach((arr,x)=>{
      arr.forEach((room,y)=>{
        if(room === null){
          this.rooms[x][y] = new MapRoom(RoomType.HOSTILE, Math.round(Math.random() * (dif.maxLevel - dif.minLevel) + dif.minLevel), this.biome)
        }
      })
    })
  }
}