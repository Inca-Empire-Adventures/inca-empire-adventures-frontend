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
  constructor(
    private roleplayService: RolePlayService
  ) { }

  ngOnInit() {
    this.inicio();
  }

  async inicio() {
    await this.postContext();
  }

  private async postContext() {

    let contextReq = new Adventure();
    contextReq.description = "Este es el primer parrafo de la aventura ambientada en el Imperio Incaico"
    contextReq.character = 1
    await this.roleplayService.postContextOriginal('', contextReq).toPromise().then(
      res => {
        console.log("text_generated:", res);
        this.output_text = res?.description
      }
    )
    this.loading = true;
  }

}
