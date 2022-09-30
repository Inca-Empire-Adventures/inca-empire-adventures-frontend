import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-selection',
  templateUrl: './name-selection.component.html',
  styleUrls: ['./name-selection.component.css']
})
export class NameSelectionComponent implements OnInit {

  imageA = 'assets/MP.png'
  imageButton = 'assets/StartButton.png'
  imageText = 'assets/Text.png'

  constructor() { }

  ngOnInit(): void {
  }

}
