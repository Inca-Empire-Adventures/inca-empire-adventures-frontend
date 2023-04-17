import { Component, OnInit, NgModule, Inject, OnDestroy } from '@angular/core';
import { Adventure } from 'src/app/shared/model/adventure';
import { Character } from 'src/app/shared/model/character';
import { Context } from 'src/app/shared/model/context';
import { ContextReq } from 'src/app/shared/model/contextReq';
import { RolePlayService } from 'src/app/shared/services/role-play.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatisticsService } from 'src/app/shared/services/statistics.service';
import { Statistics } from 'src/app/shared/model/statistics';
@Component({
  selector: 'app-roleplay-game',
  templateUrl: './roleplay-game.component.html',
  styleUrls: ['./roleplay-game.component.css']
})
export class RoleplayGameComponent implements OnInit {
  [x: string]: any;
  output_text: string | undefined;
  loading: boolean = false;
  contextReq: Adventure = new Adventure();
  isFirst: boolean = true;
  imageButton = 'assets/sendButton.png'
  d20!: number;
  dialogOpen: boolean = false;
  personaje: number = 0;
  characterName!: string;
  statisticId!: string;
  statistics!: Statistics;
  constructor(
    private roleplayService: RolePlayService,
    private statisticsService: StatisticsService,
    public dialog: MatDialog
  ) { }


  openDialog(): void {
    this.dialogOpen = true;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '600px',
      height: '400px',
      panelClass: 'custom-dialog-container',
      data: {
        charisma: this.statistics.charisma,
        constitucion: this.statistics.constitucion,
        dexterity: this.statistics.dexterity,
        intelligence: this.statistics.intelligence,
        strength: this.statistics.strength,
        wisdom: this.statistics.wisdom
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogOpen = false;
      this.getMyStatistic();
    });
  }

  ngOnInit() {
    // @ts-ignore: Object is possibly 'null'.
    this.characterName = localStorage.getItem("characterName");
    // @ts-ignore: Object is possibly 'null'.
    this.statisticId = localStorage.getItem("statisticsId");
    console.log(this.statisticId);
    this.inicio();

  }

  async inicio() {
    this.getMyStatistic();
    await this.postContext('');

  }
  getMyStatistic() {
    this.statisticsService.getMyStatistics(`${this.statisticId}/`).subscribe(
      res => {
        this.statistics = res;
        console.log("My Stats: ", this.statistics);
        this.statistics.charisma;
        this.statistics.constitucion;
        this.statistics.dexterity;
        this.statistics.intelligence;
        this.statistics.strength;
        this.statistics.wisdom;
        console.log(this.statistics.ethnicityType);
        this.personajeActual();
      }
    )
  }

  async postContext(description: string) {
    this.loading = false;
    if (localStorage.getItem("characterId") != null) {
      // @ts-ignore: Object is possibly 'null'.
      this.contextReq.character = +(localStorage.getItem("characterId"));
    }

    if (this.isFirst == true) {
      this.contextReq.description = "Este es el primer parrafo de la aventura ambientada en el Imperio Incaico"
    } else {
      this.contextReq.description = description;
    }

    await this.roleplayService.postContextOriginal('', this.contextReq).toPromise().then(
      res => {
        console.log("text_generated:", res);
        this.output_text = res?.description
      }
    )

    this.loading = true;
    this.isFirst = false;
    this.contextReq.description = '';
  }

  random() {
    this.d20 = Math.floor(Math.random() * 20) + 1;
  }
  personajeActual() {
    if (this.statistics.ethnicityType == "GOD_OF_SUN") {
      this.personaje = 1;
    }
    if (this.statistics.ethnicityType == "GOD_OF_DEATH") {
      this.personaje = 2;
    }
    if (this.statistics.ethnicityType == "GOD_OF_MOON") {
      this.personaje = 3;
    }
    if (this.statistics.ethnicityType == "GOD_OF_EARTH") {
      this.personaje = 4;
    }

    return this.personaje;
  }


}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogOverviewExampleDialog implements OnInit, OnDestroy {


  // @ts-ignore: Object is possibly 'null'.
  statisticId: number = localStorage.getItem("statisticsId");
  statistics: Statistics;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.statistics = new Statistics;
    console.log(this.statisticId);
    console.log(this.data.charisma);
    this.statistics.charisma = this.data.charisma;
  }

  ngOnInit() {
    console.log("DATA DE ROLEPLAY: {}", this.data);
  }
  ngOnDestroy(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
    this.ngOnDestroy();
  }

}