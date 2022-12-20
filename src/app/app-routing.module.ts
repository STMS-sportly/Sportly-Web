import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTeamComponent } from './create-team/create-team.component';
import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ValidationCodeComponent } from './validation-code/validation-code.component';
import { TeamComponent } from './team/team.component';
import { UserAccountComponent } from './user-account/user-account.component';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {path: 'validationCode', component: ValidationCodeComponent},
  {path: '', component: HomePageComponent},
  // {path: 'loginPage', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'loginPage', component: MainPageComponent},
  // {path: 'loginPage', component: MainPageComponent},
  // {path: 'createTeamPage', component: CreateTeamComponent, canActivate: [AuthGuard]},
  {path: 'createTeamPage', component: CreateTeamComponent},
  {path: 'myaccount', component: UserAccountComponent, canActivate: [AuthGuard]},
  // {path: 'team', component: TeamComponent, canActivate: [AuthGuard]},
  {path: 'team', component: TeamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ValidationCodeComponent, MainPageComponent, HomePageComponent, CreateTeamComponent, TeamComponent, UserAccountComponent]
