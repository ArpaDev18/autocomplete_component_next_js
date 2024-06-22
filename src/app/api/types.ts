export type UseGetCharactersParamsType = { perPage?: number; offset?: number; search?:string }

export type CharacterType = {
    id: string;
    name: string;
    alternate_names: Array<string>
    species: string;
    gender: string;
    house: string;
    dateOfBirth: string;
    yearOfBirth: string;
    wizard: boolean;
    ancestry: string;
    eyeColour: string;
    hairColour: string;
    wand: {
        wood: string;
        core: string;
        length: number;
    },
    patronus: string;
    hogwartsStudent: boolean;
    hogwartsStaff: boolean;
    actor: string;
    "alternate_actors": [],
    alive: boolean;
    image: string;
}