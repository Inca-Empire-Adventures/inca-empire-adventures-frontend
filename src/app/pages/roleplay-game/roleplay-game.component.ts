import { Component, OnInit, NgModule } from '@angular/core';
import { Adventure } from 'src/app/shared/model/adventure';
import { Character } from 'src/app/shared/model/character';
import { Context } from 'src/app/shared/model/context';
import { ContextReq } from 'src/app/shared/model/contextReq';
import { RolePlayService } from 'src/app/shared/services/role-play.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(
    private roleplayService: RolePlayService,
    public dialog: MatDialog
  ) { }


  openDialog(): void {
    this.dialogOpen = true;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '600px',
      height: '400px',
      panelClass: 'custom-dialog-container',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogOpen = false;
    });
  }

  ngOnInit() {
    this.inicio();
    // @ts-ignore: Object is possibly 'null'.
    this.characterName = localStorage.getItem("characterName");
  }

  async inicio() {

    await this.postContext('');
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
    if (1) {
      this.personaje = 1
    }

    return this.personaje;
  }


}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}