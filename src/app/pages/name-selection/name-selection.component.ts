import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/shared/model/character';
import { CharacterReq } from 'src/app/shared/model/characterReq';
import { Statistics } from 'src/app/shared/model/statistics';
import { UserReq } from 'src/app/shared/model/auth/user-req';
import { CharacterSelectionService } from 'src/app/shared/services/character-selection.service';
import { UserService } from 'src/app/shared/services/auth/user.service';
import { Adventure } from 'src/app/shared/model/adventure';
import { AdventureService } from 'src/app/shared/services/adventure.service';

@Component({
  selector: 'app-name-selection',
  templateUrl: './name-selection.component.html',
  styleUrls: ['./name-selection.component.css']
})
export class NameSelectionComponent implements OnInit {
  idCharacterSelected!: number;
  statisticsData!: Statistics;
  characterReq: CharacterReq = new CharacterReq;
  characterRes: Character = new Character;
  imageA = 'assets/MP.png'
  imageButton = 'assets/StartButton.png'
  imageText = 'assets/Text.png'
  adventure: Adventure = new Adventure;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private userService: UserService,
    private characterSelectionService: CharacterSelectionService,
    private adventureService: AdventureService
  ) {

  }

  ngOnInit(): void {
  }


  sendCharacter() {
    if (localStorage.getItem("statisticsId") != null) {
      // @ts-ignore: Object is possibly 'null'.
      this.characterReq.statistic = +(localStorage.getItem("statisticsId"));
    }
    console.log(this.characterReq.characterName);

    this.characterSelectionService.postCharacters("", this.characterReq).subscribe(
      res => {
        console.log("stats: ", res);
        this.characterRes = res;
        localStorage.setItem("characterId", this.characterRes.id.toString());
      },
      err => {
        console.log("ERROR: ", err)
      }
    );
    // @ts-ignore: Object is possibly 'null'.
    /* this.adventure.character= +localStorage.getItem("characterId");
     this.adventure.description="Aventura";
 
     this.adventureService.postAdventure("", this.adventure).subscribe(
       res => {
       },
       err => {
         console.log("ERROR: ", err)
       }
     );*/
  }
}
