import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './homepage/header/header.component';
import { AuthContentComponent } from './homepage/auth-content/auth-content.component';
import { WelcomeContentComponent } from './homepage/welcome-content/welcome-content.component';
import { LoginFormComponent } from './homepage/login-form/login-form.component';
import { ContentComponent } from './homepage/content/content.component';
import { HabitsComponent } from './homepage/habits/habits.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResoucesComponent } from './homepage/header/resouces/resouces.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthContentComponent,
    WelcomeContentComponent,
    LoginFormComponent,
    ContentComponent,
    HabitsComponent,
    ResoucesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
