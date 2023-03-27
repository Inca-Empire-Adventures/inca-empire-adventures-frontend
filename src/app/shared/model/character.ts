import { Profession } from "./profession";
import { Race } from "./race";

export class Character {
    id!: number;
    characterName!: string;
    statistic!: string;
    url!: Race;
    user!: Profession;
}