# Duns n Dracs

## Author

Erick Fonseca Perez

- [erickfons00@gmail.com](mailto:erickfons00@gmail.com)
- [github -> erick-tcsder](https://github.com/erick-tcsder)
- My personal Portfolio [erickfons.me](https://erickfons.me)

## Description

**Duns n Dracs** is a variation of this popular game mastered by **AI**.

**Cohere AI** is your *dungeon master* ... each story, each entity was generated using cohere
Everthing is about **AI**:

- The images was generated using Stable Diffusion.
- The Name generation service was manually coded to use HMM (*Hidden Markov Models*) in this sample variables *(awareness=3)*.
- The game system and the dificulty are manually configurable

## Game System

After setting up your character you can enter an instance of an unlocked dungeon. The game have several levels of dificulty through each dungeon. You can move through map defeating enemies and leveling up. In each fight Cohere Dungeon Master will generate a simple short story as introduction, afterwards the player throws the D20 (*dice of 20 sides*) obtaining random a number between 1 and 20, based on that and the gap of level between your character and the room level a result is obtained and Conhere AI generates an ending for that small story. Your level stands after beeing defeated so you can try again and eventually become the lord of this amazing world.

## Cohere

- The name of the Dungeons are static but was initially generated using cohere
- When entering a dungeon a sample of 20 magical creatures are generated
- All the magical creatures are labelled as (**HOSTILE**, **NPC** or **NEUTRAL**)
- When entering a room and given the name of the entity in thar room, the name of the character and the type of room (hostile, boss, neutral or npc) a story is generated using cohere. That story is used as introduction to the fight.
- After trowing the dice and obtaining a number, the result is used to generate a story using cohere. That story is used as ending to the fight.

## Tech Stack

- TypeScript
- React JS
- Tailwind CSS
- Cohere AI
- React Router
- Axios
- Font Awesome Icons
