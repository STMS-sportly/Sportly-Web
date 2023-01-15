import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { TeamService } from '../services/teams/team.service';
import { ApiService} from '../services/api/api.service';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
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

  teams: TeamDTO[] | null = [];
  timerSubscription!: Subscription;
  spinnerColor = "black"
  teamIconFootball: any = "../../assets/ball.png";
  // showTeams: BehaviorSubject<boolean>

  constructor(
    public readonly teamService: TeamService,
    private readonly router: Router,
    public apiService: ApiService,
    private dialogRef: MatDialog,
    public spinnerService: SpinnerService
  ) {
    // this.showTeams = new BehaviorSubject(false)
   }

  ngOnInit(): void {
    this.apiService.getUserToken();

    this.timerSubscription = timer(0, 4000).pipe(
      map(() => {
        if(!this.teamService.isModalOpen){
          this.getTeams();
        }
      })
    ).subscribe();
    this.apiService.getCurrentUserData(this.apiService.userToken!);
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  openDialog(){
    this.teamService.menuAction();
    this.dialogRef.open(ValidationCodePopUpComponent);
  }

  isTeamEmpty(): boolean {
    return this.teamService.isTeamEmpty();
  }

  getTeamIcon(index: number): string {
    if(this.teams == null){
      return ""
    }
    if(this.teams[index].discipline.name === 'football'){
      this.teamIconFootball = '../../assets/ball.png';
    } else if(this.teams[index].discipline.name === 'basketball'){
      this.teamIconFootball;
    }
    return this.teamIconFootball;
  }

  goToTeamDetails(id: number): void {
    this.apiService.getTeamDetails(id, this.apiService.userToken!);
    this.teamService.teamId = id;
    this.router.navigateByUrl('team?id=' + id);
    this.apiService.getTeamEvents(id, this.apiService.userToken!);
    // this.apiService.getDayEvents(id, this.apiService.userToken!);
    this.teamService.isTeamViewActive = true;
    this.apiService.getCurrentUserData(this.apiService.userToken!);
    this.teamService.isCurrentUserAdmin()
  }

   getTeams():void {
    this.apiService.getTeams(this.apiService.userToken!);
    this.teams = this.apiService.teams
  }

  async getIvitationCode(index: number): Promise<void> {
    let teamId : number;
    teamId = this.teamService.getTeamID(index);
    this.menuAction();
    this.apiService.getTeamCode(teamId, this.apiService.userToken!);
    this.dialogRef.open(ValidationCodePopUpComponent);;
  }

  async leaveTeam(index: number): Promise<void> {
    let teamId : number;
    teamId = this.teamService.getTeamID(index);
    this.apiService.leaveTeam(teamId, this.apiService.userToken!);
    this.getTeams();
  }

  menuAction(): void {
    this.teamService.menuAction();
  }

  doesUserHaveTeams(): boolean {
    if(this.teams == null){
      this.spinnerService.show();
      // this.showTeams.next(false);
      return false;
    }
    if(this.teams != null && this.teams.length === 0){
      this.spinnerService.hide();
      // this.showTeams.next(false);
      return false;
    }
    // this.showTeams.next(true);
    return true;
  }
}
