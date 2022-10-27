import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserReq } from 'src/app/shared/model/user-req';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-name-selection',
  templateUrl: './name-selection.component.html',
  styleUrls: ['./name-selection.component.css']
})
export class NameSelectionComponent implements OnInit {
  idCharacterSelected!: number;

  userReq: UserReq = new UserReq;

  imageA = 'assets/MP.png'
  imageButton = 'assets/StartButton.png'
  imageText = 'assets/Text.png'

  constructor(
    private _activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this._activatedRoute.params.subscribe((params) => {
      this.userReq.character = params['idCharacter'];
    });
  }

  ngOnInit(): void {
  }

  sendUserReq(): void {
    console.log("post: ", this.userReq)
    this.userService.createUser(this.userReq).subscribe(
      userResp => {
        console.log("Creado: ", userResp)
      },
      err => {
        console.log("ERROR: ", err)
      }
    )
  }



}
