import { BaseCohereService } from "./BaseCohereService";


export class StoryService{
  static async generateStoryStart(biome: string, character: string, card: string, entity: string){
    const { generations } = await BaseCohereService.generate({
      prompt: `Generate a short story told at the beginning of a dungeons and dragons turn. Leave the story unfinished.
--
Biome: "The Highlands"
Character: "Saldur"
Card: "hostile"
Entity: "Harpy"
Story:
Far await into the badlands our hero Saldur is ambushed by a bunch of Harpys that comes out of nowhere. Saldur is deeply afraid but ...
--
Biome: "Icecrown Citadel"
Character: "Momon"
Card: "npc"
Entity: "Ander the Elf"
Story:
Momon enters a huge hall at the entrance of the Icecrown Citadel. Its Ander, a blue skinned elf that comes to meet him. Talks a forgotten language but...
--
Biome: "${biome}"
Character: "${character}"
Card: "${card}"
Entity: "${entity}"
Story:
`,
      max_tokens: 300,
      frequency_penalty: 0,
      presence_penalty: 0,
      p: 0.75,
      model: 'xlarge',
      stop_sequences: ['--'],
      temperature: 1
    })

    return generations[0].text;
  }

  static async generateStoryEnding(historyStart:string, diceResult: string,character:string){
    const { generations } = await BaseCohereService.generate({
      prompt: `Write the end of the following story where ${character} ${diceResult}.
${historyStart}`,
      max_tokens: 150,
      frequency_penalty: 0,
      presence_penalty: 0,
      p: 0.75,
      model: 'command-xlarge-nightly',
      stop_sequences: ['--'],
      temperature: 0.6
    })

    return generations[0].text;
  }
}