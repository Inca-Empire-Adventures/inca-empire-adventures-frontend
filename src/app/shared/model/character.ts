import { Profession } from "./profession";
import { Race } from "./race";

export class Character {
    id!: number;
    nameGroup!: string;
    nameplayer!: string;
    race!: Race;
    profession!: Profession;
}