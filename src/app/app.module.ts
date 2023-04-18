import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterSelectionComponent } from './pages/character-selection/character-selection.component';
import { NameSelectionComponent } from './pages/name-selection/name-selection.component';
import { DialogOverviewExampleDialog, RoleplayGameComponent } from './pages/roleplay-game/roleplay-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/services/auth/auth-interceptor';
import { AuthGuard } from './shared/services/auth/auth-guard';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card"
import { CommonModule } from '@angular/common';
const routes: Routes = [
  { path: '', component: CharacterSelectionComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: 'name-selection/:idCharacter', component: NameSelectionComponent, canActivate: [AuthGuard] },
  { path: 'name-selection/:idCharacter/roleplay-game', component: RoleplayGameComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    CharacterSelectionComponent,
    NameSelectionComponent,
    RoleplayGameComponent,
    LoginComponent,
    DialogOverviewExampleDialog,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog]
})
export class AppModule { }
