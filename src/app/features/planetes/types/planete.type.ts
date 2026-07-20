export interface Planete {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: Location;
    created: string;

}

interface Location {
    url: string;
}
