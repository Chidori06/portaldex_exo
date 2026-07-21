import { Character } from "../../characters/types/character.type";

export interface Planete {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: Character[];
    url: Location;
    created: string;

}

interface Location {
    url: string;
}
