import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/shared/model/character';
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
  statistics: Statistics[] = [];
  images: string[];
  race!: string;
  profession!: string;
  equipment!: string;
  strength!: number;
  intelligence!: number;
  dexterty!: number;
  charisma!: number;
  wisdom!: number;
  constitution!: number;
  hp!: string;
  statisticsRequest = new StatisticsReq
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
    this.getAllCharacters();
    this.getAllStatistics();
    //this.listenerCambios.emit({ etapa: ProcesoEnum.NAMESELECTION });
  }

  private getAllCharacters() {
    this.characterSelectionService.getAllCharacters("").subscribe(
      res => {
        let data: Character[] = res;
        this.characters = data;
        console.log("DATA: ", data)
      }
    )
  }

  private getAllStatistics() {
    this.statisticsService.getAllStatistics("").subscribe(
      res => {
        let data: Statistics[] = res;
        this.statistics = data;
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

    this.charisma = this.statisticsRequest.charisma + this.statistics[id - 1].charisma;
    this.constitution = this.statisticsRequest.constitucion + this.statistics[id - 1].constitucion;
    this.dexterty = this.statisticsRequest.dexterity + this.statistics[id - 1].dexterity;
    this.intelligence = this.statisticsRequest.intelligence + this.statistics[id - 1].intelligence;
    this.strength = this.statisticsRequest.strength + this.statistics[id - 1].strength;
    this.wisdom = this.statisticsRequest.wisdom + this.statistics[id - 1].wisdom;

    this.characterSelectionService.getAllCharacters("").subscribe(
      res => {
        let data: Character[] = res;
        this.characters = data;
        console.log("DATA: ", data)
      }
    )
  }

  postStatisticsContinuar() {
    this.statisticsService.postStatistics("/", this.statisticsRequest).subscribe(
      res => {
        console.log("stats: ", res)
      },
      err => {
        console.log("ERROR: ", err)
      }
    );
  }

  getCharacterN(id: number) {
    this.idCharacterSelected = id;
    this.race = this.characters[id - 1].race.name;
    this.profession = this.characters[id - 1].profession.name;

    if (id == 1) {
      this.setStatistics(id);
      this.equipment = "Fire Cloak";
      this.hp = "120";
    }
    if (id == 2) {
      this.setStatistics(id);
      this.equipment = "Death Mask";
      this.hp = "100";
    }
    if (id == 3) {
      this.setStatistics(id);
      this.equipment = "Cursed Jewel";
      this.hp = "150";
    }
    if (id == 4) {
      this.setStatistics(id);
      this.equipment = "Bow";
      this.hp = "130";
    }

  }
}
