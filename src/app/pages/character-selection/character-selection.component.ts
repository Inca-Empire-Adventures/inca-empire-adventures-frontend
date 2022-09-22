import { Component, OnInit } from '@angular/core';
import { CharacterSelectionService } from 'src/app/shared/services/character-selection.service';

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.css']
})
export class CharacterSelectionComponent implements OnInit {
  title = 'INCA EMPIRE ADVENTURES';
  constructor(
    private characterSelectionService: CharacterSelectionService
  ) { }

  ngOnInit(): void {
    this.getAllCharacters();

  }

  private getAllCharacters() {
    this.characterSelectionService.getAllCharacters("")
  }

}
