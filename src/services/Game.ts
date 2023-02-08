import random from "random";
import { getMoveOptions } from "../utils/positionUtils";
import { Map, MapRoom, RoomType } from "./Map";
import { EntitiesService } from "./cohere/EntitiesService";
import { Character } from "./Character";
import { StoryService } from "./cohere/StoryService";
import classNames from "classnames";

export class Game {
  public map: Map;
  public _pos: number = 0;
  public x: number = 5;
  public y: number = 7;
  public entities: { name: string; label: string }[] = [];
  public biome: string;
  public randomU = random.uniformInt(1, 577);
  public ended : 'die'|'win'|false = false

  constructor(biome: string, minLevel: number, maxLevel: number, fromJSON?: boolean, fromJSONMap?: Map, fromJSONPos?: number) {
    if (fromJSON && fromJSONMap && typeof fromJSONPos === 'number') {
      this.map = fromJSONMap;
      this.biome = biome;
      this._pos = fromJSONPos;
      return
    }else{
      this.map = new Map(
        `${biome}-${Date.now().toString()}`,
        biome,
        this.x,
        this.y,
        (x, y) => {
          return {
            minLevel: minLevel,
            maxLevel: maxLevel,
            bossRooms: 1,
            npcRatio: 1 / 7,
            treasureRatio: 1 / 9,
            voidRatio: 1 / 10,
          };
        }
      );
      this._pos = 0;
      this.biome = biome;
      if(this.map.rooms[0][0]){
        this.map.rooms[0][0].visited = true
      }
    }
  }

  public async generateEntities() {
    if (this.entities && this.entities.length) return;
    const entities = await EntitiesService.generateEntities(this.biome, 15);
    this.entities = (await EntitiesService.classifyEntities(entities)).map(
      (e) => ({
        name: e.input,
        label: e.label,
      })
    );
  }
  public get currentPosition() {
    const x_c = this._pos % this.x;
    const y_c = Math.floor(this._pos / this.x);
    return {
      x: x_c,
      y: y_c,
    };
  }
  public set currentPosition({ x, y }: { x: number; y: number }) {
    this._pos = x + y * 7;
  }
  public get currentRoom() {
    return this.map.rooms[this.currentPosition.x][this.currentPosition.y];
  }

  public getAndPopulateMoveOptions() {
    const mo = getMoveOptions(this._pos, this.x, this.y);
    const roomsOpt = mo.map(
      (mop) => this.map.rooms[mop.pos % this.x][Math.floor(mop.pos / this.x)]
    );
    return mo.map((mop, i) => {
      return {
        direction: mop.direction,
        room: roomsOpt[i],
        pos: mop.pos,
      };
    });
  }

  public async visitRoom(room: MapRoom, pos: number, character: string) {
    let wasV = room.visited
    if(!room) return wasV
    if (!room.visited) {
      const entitiesFiltered = this.entities
        .filter((e) => e.label === (MapRoom.getCardFromRoomType(room.roomType) === RoomType.BOSS ? 'hostile': MapRoom.getCardFromRoomType(room.roomType)))
        .map((e) => e.name);
      await room.getStartingStory(
        character,
        entitiesFiltered[this.randomU() % entitiesFiltered.length]
      );
    }
    room.visited = true;
    this.map.rooms[pos % this.x][Math.floor(pos / this.x)] = room;
    this._pos = pos;
    return wasV
  }

  public throwDice() {
    return (this.randomU() % 20) + 1;
  }

  public async endRoom(character: Character) {
    const room = this.map.rooms[this.currentPosition.x][this.currentPosition.y];
    if (!room) throw new Error("No room found");
    const diceResult = this.throwDice();

    if (room.roomType === RoomType.HOSTILE || room.roomType === RoomType.BOSS) {
      let win = false
      const levelFactor = ((character.level*character.getAtkBoostFromAtk() - (room?.roomLevel ?? 0)) / 3);
      const drComprehension = classNames({
        "easily wins": diceResult >= 15 - levelFactor,
        "barely wins":
          diceResult > 10 - levelFactor && diceResult < 15 - levelFactor,
        ties: diceResult === 10 - levelFactor,
        "barely loses":
          diceResult > 5 - levelFactor && diceResult < 10 - levelFactor,
        "easily loses":
          diceResult > 0 - levelFactor && diceResult <= 5 - levelFactor,
        "instantly death": diceResult <= 0 - levelFactor,
      });
      room.endingStory = await StoryService.generateStoryEnding(
        room?.startingStory ?? "",
        drComprehension,
        character.name
      );
      const { dead } = character.m_hp(
        Math.min(
          (diceResult - 15 + levelFactor) *
            3 *
            character.getDamageReductionFromDef(),
          diceResult + levelFactor < 0 ? -99999 : 0
        )
      );
      if(!dead){
        character.m_xp(diceResult * 4)
        if(room.roomType === RoomType.BOSS){
          win = true
          this.ended = 'win'
        }
      }else{
        this.ended = 'die'
      }
      return {
        diceResult,
        endStory: room?.endingStory,
        dead,
        win
      };
    } else if (room.roomType === RoomType.EMPTY) {
      room.endingStory =
        "You find nothing. But get the chance to recover some HP";
      character.m_hp(character.maxHP * (diceResult / 40));
      return {
        diceResult,
        endStory: room?.endingStory,
        dead: false,
        win: false
      };
    } else if (room.roomType === RoomType.TREASURE) {
      room.endingStory =
        "You find a treasure chest! You open it and find some gold!";
      character.m_gold(diceResult * 10);
      return {
        diceResult,
        endStory: room?.endingStory,
        dead: false,
        win: false
      };
    } else if (room.roomType === RoomType.NPC) {
      const actions = [
        {
          text: "get some gold",
          obj: "gold",
        },
        {
          text: "train to enhance the attack",
          obj: "atk",
        },
        {
          text: "train to enhance the defense",
          obj: "def",
        },
        {
          text: "meditates to recover some HP",
          obj: "hp",
        },
      ];
      const action = actions[this.randomU() % actions.length];
      room.endingStory = await StoryService.generateStoryEnding(
        room?.startingStory ?? "",
        action.text,
        character.name
      );
      if (action.obj === "gold") {
        character.m_gold(diceResult * 10);
      }
      if (action.obj === "hp") {
        character.m_hp(diceResult * 10);
      }
      if (action.obj === "atk") {
        character.m_atk(diceResult);
        character.m_xp(diceResult*5)
      }
      if (action.obj === "def") {
        character.m_def(diceResult);
        character.m_xp(diceResult*5)
      }

      return {
        diceResult,
        endStory: room?.endingStory,
        dead: false,
        win: false
      }
    }else {
      throw new Error("Room type not found")
    }
  }

  public toJSON(){
    return {
      map: this.map.toJSON(),
      entities: this.entities,
      _pos: this._pos,
      x: this.x,
      y: this.y,
      biome: this.biome,
      ended: this.ended
    }
  }

  public static fromJSON(json: any){
    const map = Map.fromJSON(json.map)
    const game = new Game(json.biome,0,0,true, map, json._pos)
    game.entities = json.entities
    game.ended = json.ended
    return game
  }
}
