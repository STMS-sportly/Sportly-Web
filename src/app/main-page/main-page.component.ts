import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { TeamService } from '../services/teams/team.service';
import { ApiService} from '../services/api/api.service';
import { Observable, Subscription, timer } from 'rxjs';
import firebase from 'firebase/compat/app';
import { TeamDTO } from '../models/team';
import { MatDialog } from '@angular/material/dialog';
import { ValidationCodePopUpComponent } from '../validation-code-pop-up/validation-code-pop-up.component';
import { CreateTeamComponent } from '../create-team/create-team.component';
import { ValidationCodeComponent } from '../validation-code/validation-code.component';
import { SpinnerService } from '../services/spinner/spinner.service';

@Component({
  selector: 'main-login-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{

  teams: TeamDTO[] = [];
  timerSubscription!: Subscription;

  teamIconFootball: any = "../../assets/ball.png";


  constructor(
    public readonly teamService: TeamService,
    private readonly router: Router,
    public apiService: ApiService,
    private dialogRef: MatDialog,
    public spinnerService: SpinnerService
  ) { }

   async ngOnInit(): Promise<void> {
    // const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    this.apiService.getUserToken();
    this.apiService.getCurrentUserData(this.apiService.userToken!);
    this.timerSubscription = timer(0, 30000).pipe(
      map(() => {
        if(!this.teamService.isModalOpen){
          this.getTeams();
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  openDialog(){
    this.teamService.isModalOpen = true;
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

  goToTeamDetails(index: number): void {
    // const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    // this.apiService.getDisciplines(this.apiService.userToken!);
    let teamId : number;
    teamId = this.teamService.getTeamID(index);
    this.apiService.getTeamDetails(teamId, this.apiService.userToken!);
    console.log(this.apiService.teamDetails);
    this.router.navigateByUrl('team?id=' + teamId);
    this.apiService.getMonthEvents(teamId, this.apiService.userToken!);
    this.apiService.getDayEvents(teamId, this.apiService.userToken!);
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
    let teamId : number;
    teamId = this.teamService.getTeamID(index);
    this.apiService.getTeamCode(teamId, this.apiService.userToken!);
    this.teamService.isModalOpen = true;
    this.dialogRef.open(ValidationCodePopUpComponent);;
  }

  async leaveTeam(index: number): Promise<void> {
    let teamId : number;
    teamId = this.teamService.getTeamID(index);
    this.apiService.leaveTeam(teamId, this.apiService.userToken!);
    this.getTeams();
  }

  onPageChange(e: any) {

  }
}
