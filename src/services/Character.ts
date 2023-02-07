export class Character{
  public level: number
  public name: string
  public g: number
  public xp: number
  public nextLevelXp: number
  public maxLevel: number
  public maxHP: number
  public currentHP: number
  public def: number = 0
  public atk: number = 0
  public gender: "MALE"|"FEMALE" = 'MALE'

  constructor(level: number, name: string, initG: number){
    this.level = level
    this.name = name
    this.g = initG
    this.xp = 0
    this.nextLevelXp = 100*(1.05**level)
    this.maxLevel = 99
    this.maxHP = 100
    this.currentHP = 100
  }

  public m_gold(amount:number){
    if(amount < 0 && this.g < amount){
      throw new Error('Not enough gold')
    }
    this.g += amount
  }

  public m_xp(amount:number){
    if(amount < 0 && this.xp < amount){
      throw new Error('Not enough xp')
    }
    this.xp += amount
    while(true){
      if(this.xp >= this.nextLevelXp){
        this.levelUp()
      }else break
    }
  }

  public levelUp(){
    if(this.level >= this.maxLevel) return
    this.level++
    this.xp -= this.nextLevelXp
    this.nextLevelXp = 100*(1.05**this.level)
    this.maxHP += 10
    this.atk += 1.05**this.level
    this.def += 1.05**this.level
    this.currentHP = this.maxHP
  }

  public m_hp(amount:number):{dead: boolean}{
    if(amount < 0 && this.currentHP < Math.abs(amount)){
      this.currentHP = 0
      return {dead: true}
    }
    this.currentHP += amount
    if(this.currentHP > this.maxHP) this.currentHP = this.maxHP
    return {dead: false}
  }

  public m_atk(amount:number){
    if(amount < 0 && this.atk < amount){
      throw new Error('Not enough atk')
    }
    this.atk += amount
  }
  public m_def(amount:number){
    if(amount < 0 && this.def < amount){
      throw new Error('Not enough def')
    }
    this.def += amount
  }

  public getDamageReductionFromDef(){
    const pcent = 15*(Math.log(this.def+1)/Math.log(3))
    return Math.min(pcent/100,1) 
  }

  public getAtkBoostFromAtk(){
    const pcent = 30*(Math.log(this.atk+1)/Math.log(3))
    return 1+pcent/100
  }

  public static FromJSON(json:any){
    const c = new Character(json.level ?? 0,json.name ?? 'John Doe',json.g ?? 0)
    c.xp = json.xp ?? 0
    c.nextLevelXp = json.nextLevelXp ?? 100
    c.maxLevel = json.maxLevel ?? 99
    c.maxHP = json.maxHP ?? 100
    c.currentHP = json.currentHP ?? 100
    c.def = json.def ?? 0
    c.atk = json.atk ?? 0
    c.gender = json.gender ?? 'MALE'
    return c
  }

  public static ToJSON(c:Character){
    return {
      level: c.level,
      name: c.name,
      g: c.g,
      xp: c.xp,
      nextLevelXp: c.nextLevelXp,
      maxLevel: c.maxLevel,
      maxHP: c.maxHP,
      currentHP: c.currentHP,
      def: c.def,
      atk: c.atk,
      gender: c.gender
    }
  }
} 