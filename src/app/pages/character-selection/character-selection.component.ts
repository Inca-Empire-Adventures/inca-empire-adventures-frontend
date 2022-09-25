import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/shared/model/character';
import { CharacterSelectionService } from 'src/app/shared/services/character-selection.service';


@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.css']
})
export class CharacterSelectionComponent implements OnInit {

  title = 'INCA EMPIRE ADVENTURES';
  characters: Character[] = [];
  images: string[];
  race!: string;
  profession!: string;
  equipment!: string;
  strength!: string;
  intelligence!: string;
  dexterty!: string;
  charisma!: string;
  wisdom!: string;
  constitution!: string;
  hp!: string;

  constructor(
    private characterSelectionService: CharacterSelectionService,
    private router: Router
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
  getCharacterN(id: number) {
    this.race = this.characters[id - 1].race.name;
    this.profession = this.characters[id - 1].profession.name;
    if (id == 1) {
      this.equipment = "Fire Cloak";
      this.strength = "3";
      this.intelligence = "5";
      this.dexterty = "2";
      this.charisma = "2";
      this.wisdom = "5";
      this.constitution = "5";
      this.hp = "120";
    }
    if (id == 2) {
      this.equipment = "Death Mask";
      this.strength = "5";
      this.intelligence = "5";
      this.dexterty = "4";
      this.charisma = "2";
      this.wisdom = "5";
      this.constitution = "5";
      this.hp = "100";
    }
    if (id == 3) {
      this.equipment = "Cursed Jewel";
      this.strength = "5";
      this.intelligence = "5";
      this.dexterty = "4";
      this.charisma = "2";
      this.wisdom = "5";
      this.constitution = "5";
      this.hp = "150";
    }
    if (id == 4) {
      this.equipment = "Bow";
      this.strength = "5";
      this.intelligence = "5";
      this.dexterty = "4";
      this.charisma = "2";
      this.wisdom = "5";
      this.constitution = "5";
      this.hp = "130";
    }
    if (id == 5) {
      this.equipment = "Dual-Wield";
      this.strength = "5";
      this.intelligence = "5";
      this.dexterty = "4";
      this.charisma = "2";
      this.wisdom = "5";
      this.constitution = "5";
      this.hp = "130";
    }

  }

  next() {
    console.log("Entra next");
    //this.listenerCambios.emit({ etapa: ProcesoEnum.NAME_SELECTION });
    this.router.navigate(['name-selection'])
  }
}
