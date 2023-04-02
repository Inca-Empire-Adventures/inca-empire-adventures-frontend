import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterSelectionComponent } from './pages/character-selection/character-selection.component';
import { NameSelectionComponent } from './pages/name-selection/name-selection.component';
import { RoleplayGameComponent } from './pages/roleplay-game/roleplay-game.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSelectionComponent,
    NameSelectionComponent,
    RoleplayGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule.forRoot([
      { path: '', component: CharacterSelectionComponent },
      { path: 'name-selection/:idCharacter', component: NameSelectionComponent },
      { path: 'name-selection/:idCharacter/roleplay-game', component: RoleplayGameComponent },
    ])
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
