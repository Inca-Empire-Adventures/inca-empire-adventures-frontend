import { Component, OnInit } from '@angular/core';
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

    let contextReq = new ContextReq();
    contextReq.text_generated = "The god of sun came to help the inca empire"
    await this.roleplayService.postContextOriginal('', contextReq).toPromise().then(
      res => {
        console.log("text_generated:", res);
        this.output_text = res?.text_generated
      }
    )
    this.loading = true;
  }

}
