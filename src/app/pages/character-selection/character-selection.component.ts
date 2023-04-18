import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/shared/model/character';
import { Profession } from 'src/app/shared/model/profession';
import { Statistics } from 'src/app/shared/model/statistics';
import { StatisticsReq } from 'src/app/shared/model/statisticsReq';
import { CharacterSelectionService } from 'src/app/shared/services/character-selection.service';
import { StatisticsService } from 'src/app/shared/services/statistics.service';


@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.css']
})
export class CharacterSelectionComponent implements OnInit {

  idCharacterSelected!: number;
  title = 'INCA EMPIRE ADVENTURES';
  characters: Character[] = [];
  character: Character = new Character;
  statistics: Statistics[] = [];
  professions: Profession[] = [];
  images: string[];
  race!: string;
  raceId!: string;
  profession!: string;
  equipment!: string;
  strength!: number;
  intelligence!: number;
  dexterty!: number;
  charisma!: number;
  wisdom!: number;
  constitution!: number;
  ethnicity!: number;
  hp!: string;
  statisticsRequest = new StatisticsReq
  statisticsData = new Statistics;
  diceRes!: number;
  SatisticsService: any;
  constructor(
    private characterSelectionService: CharacterSelectionService,
    private statisticsService: StatisticsService,
  ) {
    this.images = [
      'asd',
      'assets/DiosSol.png',
      'assets/DiosMuerte.png',
      'assets/DiosaLuna.png',
      'assets/DiosaTierra.png',
      'assets/CreadorUniverso.png'
    ]
  }

  ngOnInit(): void {
    //this.getAllCharacters();
    this.getAllStatistics();
    this.getAllProfessions();
    //this.listenerCambios.emit({ etapa: ProcesoEnum.NAMESELECTION });
  }

  private getAllCharacters() {
    this.characterSelectionService.getAllCharacters("").subscribe(
      res => {
        let data: Character[] = res;
        data.length = 4;
        this.characters = data;
        console.log("DATAS: ", data)
      }
    )
  }

  private getAllStatistics() {
    this.statisticsService.getAllStatistics("").subscribe(
      res => {
        let data: Statistics[] = res;
        this.statistics = data;
        console.log("DATA stat: ", data);
      }
    )
  }

  private getAllProfessions() {
    this.characterSelectionService.getAllProfessions("").subscribe(
      res => {
        let data: Profession[] = res;
        this.professions = data;
        console.log("DATA: ", data);
      }
    )
  }

  rolDice() {
    this.diceRes = 0;
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    let dice3 = Math.floor(Math.random() * 6) + 1;
    let dice4 = Math.floor(Math.random() * 6) + 1;

    let array = [dice1, dice2, dice3, dice4];

    array.sort((a, b) => b - a);

    console.log(array);
    array.pop();
    console.log(array);

    for (var i = 0; i < array.length; i++) {
      this.diceRes = this.diceRes + array[i];
    }
    console.log(this.diceRes);
    return this.diceRes;
  }

  setStatistics(id: number) {
    this.statisticsRequest = new StatisticsReq();
    this.statisticsRequest.charisma = this.rolDice();
    this.statisticsRequest.constitucion = this.rolDice();
    this.statisticsRequest.dexterity = this.rolDice();
    this.statisticsRequest.intelligence = this.rolDice();
    this.statisticsRequest.strength = this.rolDice();
    this.statisticsRequest.wisdom = this.rolDice();

    console.log("strength:", this.statisticsRequest.strength);
    console.log("intelligence:", this.statisticsRequest.intelligence);
    console.log("dexterity:", this.statisticsRequest.dexterity);
    console.log("charisma:", this.statisticsRequest.charisma);
    console.log("wisdom:", this.statisticsRequest.wisdom);
    console.log("constitucion:", this.statisticsRequest.constitucion);

    this.charisma = this.statisticsRequest.charisma;
    this.constitution = this.statisticsRequest.constitucion;
    this.dexterty = this.statisticsRequest.dexterity;
    this.intelligence = this.statisticsRequest.intelligence;
    this.strength = this.statisticsRequest.strength;
    this.wisdom = this.statisticsRequest.wisdom;

    if (id == 1) {
      this.strength = this.strength + 2;
      this.dexterty = this.dexterty + 1;
    }
    if (id == 2) {
      this.intelligence = this.intelligence + 1;
      this.dexterty = this.dexterty + 2;
    }
    if (id == 3) {
      this.charisma = this.charisma + 1;
      this.constitution = this.constitution + 1;
      this.dexterty = this.dexterty + 1;
      this.intelligence = this.intelligence + 1;
      this.strength = this.strength + 1;
      this.wisdom = this.wisdom + 1;
    }
    if (id == 4) {
      this.intelligence = this.intelligence + 2;
      this.dexterty = this.dexterty + 1;
    }
    console.log("el ethnicity es: ", this.race)
  }

  postStatisticsContinuar() {
    this.statisticsRequest.ethnicityType = this.raceId;
    this.statisticsService.postStatistics("/", this.statisticsRequest).subscribe(
      res => {
        console.log("stats: ", res)
        this.statisticsData = res;
        localStorage.setItem("statisticsId", this.statisticsData.id.toString());
      },
      err => {
        console.log("ERROR: ", err)
      }

    );
  }

  getCharacterN(id: number) {

    this.idCharacterSelected = id;
    this.profession = this.professions[id - 1].name;

    if (id == 1) {
      this.setStatistics(id);
      this.race = "God of Sun";
      this.raceId = "GOD_OF_SUN";
      this.equipment = "Fire Cloak";
      this.hp = "120";
    }
    if (id == 2) {
      this.setStatistics(id);
      this.race = "God of Death";
      this.raceId = "GOD_OF_DEATH";
      this.equipment = "Death Mask";
      this.hp = "100";
    }
    if (id == 3) {
      this.setStatistics(id);
      this.race = "God of Moon";
      this.raceId = "GOD_OF_MOON";
      this.equipment = "Cursed Jewel";
      this.hp = "150";
    }
    if (id == 4) {
      this.setStatistics(id);
      this.race = "God of Earth";
      this.raceId = "GOD_OF_EARTH";
      this.equipment = "Bow";
      this.hp = "130";
    }

  }
}
