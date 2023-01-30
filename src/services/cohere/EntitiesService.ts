import { BaseCohereService } from "./BaseCohereService";

export class EntitiesService{
  static async generateEntities(biome: string, count: number){
    const {generations} = await BaseCohereService.generate({
      prompt: `Generate magical creatures from the universe of dungeons and dragons.
--
Count: 3
Biome: "Dusty Desert"
Response:
1. Sand Worm
2. Dune Traveler
3. Mummy
--
Count: 5
Biome: "Magic Forest"
Response:
1. Dryad
2. Druid
3. Bear
4. Dwarf
5. Gnome
--
Count: ${count}
Biome: "${biome}"
Response:
`,
      model: 'command-xlarge-nightly',
      max_tokens: 300,
      temperature: 0.9,
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    const output = generations[0].text
    return [...output.matchAll(/[0-9]+. [A-Za-z ']+/g)].map(m => m[0]).map(m => m.replace(/[0-9]+. /g, ''))
  }

  static async classifyEntities(entities: string[]){
    const {classifications} = await BaseCohereService.classify({
      inputs: entities,
      examples: [
        {
          text: 'Elf',
          label: 'npc'
        },
        {
          label: 'hostile',
          text: 'Orc'
        },
        {
          label: 'hostile',
          text: 'Spider'
        },
        {
          label: 'neutral',
          text: 'Unicorn'
        },
        {
          label: 'neutral',
          text: 'Giant'
        },
        {
          label: 'neutral',
          text: 'Camel'
        },
        {
          label: 'neutral',
          text: 'Dog'
        },
        {
          label: 'npc',
          text: 'Gnome'
        },
        {
          label: 'npc',
          text: 'Human'
        },
        {
          label: 'npc',
          text: 'Dwarf'
        }
      ],
      model: 'small'
    })
    return classifications.map(c=>({
      input: c.input,
      label: c.prediction,
    }))
  }
}