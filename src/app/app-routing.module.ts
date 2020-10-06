import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './_guard/auth.guard';
import {NoauthGuard} from './_guard/noauth.guard';
import {ChallengeComponent} from './challenge/challenge.component';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';
import {RegisterComponent} from './register/register.component';
import {AdminGuard} from './_guard/admin.guard';
import {UpdatechallengeComponent} from './updatechallenge/updatechallenge.component';
import {UpdateuserComponent} from './updateuser/updateuser.component';
import {CreatechallengeComponent} from './createchallenge/createchallenge.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [NoauthGuard]
  },
  {
    path: 'challenges',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'challenge/:id',
    component: ChallengeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'scoreboard',
    component: ScoreboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'updatechallenge/:id',
    component: UpdatechallengeComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'updateuser/:id',
    component: UpdateuserComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'createchallenge',
    component: CreatechallengeComponent,
    canActivate: [AuthGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
