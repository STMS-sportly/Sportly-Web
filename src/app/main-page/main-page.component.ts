import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { TeamService } from '../services/teams/team.service';
import { ApiService} from '../services/api/api.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { TeamDTO } from '../models/team';
import { MatDialog } from '@angular/material/dialog';
import { ValidationCodePopUpComponent } from '../validation-code-pop-up/validation-code-pop-up.component';
import { CreateTeamComponent } from '../create-team/create-team.component';
import { ValidationCodeComponent } from '../validation-code/validation-code.component';

@Component({
  selector: 'main-login-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{

  teams: TeamDTO[] = [];


  teamIconFootball: any = "../../assets/ball.png";
  image = document.getElementById("image");


  constructor(
    public readonly teamService: TeamService,
    private readonly router: Router,
    public apiService: ApiService,
    private dialogRef: MatDialog
  ) { }

   ngOnInit() {
    this.getTeams();

  }

  openDialog(){
    this.dialogRef.open(ValidationCodePopUpComponent);
  }

  isTeamEmpty(): boolean {
    return this.teamService.isTeamEmpty();
  }

  getTeamIcon(index: number): string {
    if(this.teams[index].discipline.name === 'football'){
      this.teamIconFootball = '../../assets/ball.png';
    } else if(this.teams[index].discipline.name === 'basketball'){
      this.teamIconFootball;
    }
    return this.teamIconFootball;
  }

  async goToTeamDetails(index: number): Promise<void> {
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    this.apiService.getDisciplines(userToken!);
    let teamId : number;
    teamId = this.teamService.getTeamID(index);
    this.apiService.getTeamDetails(teamId, userToken!);
    console.log(this.apiService.teamDetails);
    this.router.navigateByUrl('team?id=' + teamId);
    this.apiService.getMonthEvents(teamId, userToken!);
    this.teamService.isTeamViewActive = true;
  }

  async getTeams(): Promise<void> {
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));

    this.apiService.getTeams(userToken!);
    // this.colorMapper();
    console.log(this.apiService.teams)
    this.teams = this.apiService.teams
  }

  async getIvitationCode(index: number): Promise<void> {
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    let teamId : number;
    teamId = this.teamService.getTeamID(index);
    this.apiService.getTeamCode(teamId, userToken!);
    console.log(this.apiService.invitationCode)
    this.dialogRef.open(ValidationCodePopUpComponent);;
  }

  async leaveTeam(index: number): Promise<void> {
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    let teamId : number;
    teamId = this.teamService.getTeamID(index);
    this.apiService.leaveTeam(teamId, userToken!);
    this.getTeams();
  }
}
