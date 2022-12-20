import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HomePageComponent } from '../home-page/home-page.component';
import { AuthService } from '../services/auth/auth.service';
import { TeamService } from '../services/teams/team.service';
import firebase from 'firebase/compat/app';
import { CreateTeamComponent } from '../create-team/create-team.component';
import { ApiService } from '../services/api/api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  user$ = this.authService.user$;
  logout$!: Observable<any>

  constructor(
    public angularFireAuth: AngularFireAuth,
    private readonly authService: AuthService,
    private readonly router: Router,
    public teamService: TeamService,
    public apiService: ApiService,
    public dialog: MatDialog,
  ) { }

  logout(): void {
    this.logout$ = this.authService.logout()
      .pipe(
        tap(() => this.router.navigateByUrl(''))
      )
  }

  async goToCreateTeam(): Promise<void> {
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    this.apiService.getDisciplines(userToken!);
    this.router.navigateByUrl('createTeamPage');
    // this.dialog.open(CreateTeamComponent);
    console.log(this.apiService.teams);
  }

  goToJoinTeam(): void {
    this.router.navigateByUrl('validationCode');
    // this.dialogRef.open(ValidationCodeComponent);
  }

  goToMyAccountInfo(): void {
    this.router.navigateByUrl('myaccount');
  }

  goToMainPage(): void {
    this.router.navigateByUrl('loginPage');
  }
}
