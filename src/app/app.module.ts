import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './_guard/auth.guard';
import {NoauthGuard} from './_guard/noauth.guard';
import {UserService} from './_service/user.service';
import {ChallengeService} from './_service/challenge.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AlertComponent} from './_directive/alert.component';
import {AlertService} from './_service/alert.service';
import {ChallengeComponent} from './challenge/challenge.component';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';
import {RegisterComponent} from './register/register.component';
import {AdminGuard} from './_guard/admin.guard';
import {UpdatechallengeComponent} from './updatechallenge/updatechallenge.component';
import {UpdateuserComponent} from './updateuser/updateuser.component';
import {CreatechallengeComponent} from './createchallenge/createchallenge.component';
import {RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {TeamService} from './_service/team.service';

@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    ChallengeComponent,
    ScoreboardComponent,
    RegisterComponent,
    UpdatechallengeComponent,
    UpdateuserComponent,
    CreatechallengeComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RichTextEditorAllModule,
    NgxQRCodeModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AlertService,
    UserService,
    ChallengeService,
    TeamService,
    AuthGuard,
    NoauthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
