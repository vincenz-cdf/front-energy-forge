import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './homepage/header/header.component';
import { AuthContentComponent } from './homepage/auth-content/habits-content/auth-content.component';
import { WelcomeContentComponent } from './homepage/welcome-content/welcome-content.component';
import { LoginFormComponent } from './homepage/login-form/login-form.component';
import { ContentComponent } from './homepage/content/content.component';
import { HabitsComponent } from './homepage/habits/habits.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResoucesComponent } from './homepage/header/resouces/resouces.component';
import { CharactersComponent } from './homepage/characters/characters.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CharacterEquipment } from './homepage/dialogs/character-equipment.component';
import { ExpeditionContentComponent } from './homepage/auth-content/expedition/expedition-content/expedition-content.component';
import { CombatInstanceComponent } from './homepage/auth-content/expedition/dialogs/combat-instance/combat-instance.component';
import { CharacterCombatSelectComponent } from './homepage/auth-content/expedition/dialogs/character-combat-select/character-combat-select.component';
import { BuildingsComponent } from './homepage/auth-content/buildings/buildings.component';
import { GroupConsumablesPipe } from './pipes/group-consumables.pipe';
import { ToastrModule } from 'ngx-toastr';
import { MidnightCountdownComponent } from './utils/midnight-countdown/midnight-countdown.component';
import { HelpComponent } from './homepage/auth-content/help/help.component';
import { GenericInputComponent } from './homepage/auth-content/dialogs/generic-input/generic-input.component';
import { StripeDiamondComponent } from './homepage/auth-content/stripe-diamond/stripe-diamond.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthContentComponent,
    WelcomeContentComponent,
    LoginFormComponent,
    ContentComponent,
    HabitsComponent,
    ResoucesComponent,
    CharactersComponent,
    CharacterEquipment,
    ExpeditionContentComponent,
    CombatInstanceComponent,
    CharacterCombatSelectComponent,
    BuildingsComponent,
    GroupConsumablesPipe,
    MidnightCountdownComponent,
    HelpComponent,
    GenericInputComponent,
    StripeDiamondComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
