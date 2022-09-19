import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterSelectionComponent } from './pages/character-selection/character-selection.component';
import { NameSelectionComponent } from './pages/name-selection/name-selection.component';
import { RoleplayGameComponent } from './pages/roleplay-game/roleplay-game.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSelectionComponent,
    NameSelectionComponent,
    RoleplayGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
