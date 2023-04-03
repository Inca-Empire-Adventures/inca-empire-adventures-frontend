import { Component, OnInit, NgModule } from '@angular/core';
import { Adventure } from 'src/app/shared/model/adventure';
import { Character } from 'src/app/shared/model/character';
import { Context } from 'src/app/shared/model/context';
import { ContextReq } from 'src/app/shared/model/contextReq';
import { RolePlayService } from 'src/app/shared/services/role-play.service';

@Component({
  selector: 'app-roleplay-game',
  templateUrl: './roleplay-game.component.html',
  styleUrls: ['./roleplay-game.component.css']
})
export class RoleplayGameComponent implements OnInit {
  output_text: string | undefined;
  loading: boolean = false;
  contextReq: Adventure = new Adventure();
  isFirst: boolean = true;
  imageButton = 'assets/sendButton.png'
  constructor(
    private roleplayService: RolePlayService
  ) { }

  ngOnInit() {
    this.inicio();
  }

  async inicio() {
    await this.postContext();
  }

  async postContext() {

    if (this.isFirst == true) {
      this.contextReq.description = "Este es el primer parrafo de la aventura ambientada en el Imperio Incaico"
    }
    // @ts-ignore: Object is possibly 'null'.
    this.contextReq.character = +localStorage.getItem("characterId");
    await this.roleplayService.postContextOriginal('', this.contextReq).toPromise().then(
      res => {
        console.log("text_generated:", res);
        this.output_text = res?.description
      }
    )
    this.contextReq.description = "";
    this.loading = true;
    this.isFirst = false;
  }

}
