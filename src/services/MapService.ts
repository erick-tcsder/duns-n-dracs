

enum RoomType{
  EMPTY,
  VOID,
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

  constructor(roomType: RoomType){
    this.roomType = roomType
  }

}

export class MapService{
  constructor(){

  }
}