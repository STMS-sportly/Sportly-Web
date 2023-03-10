import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeamDTO } from '../models/team';
import { ApiService } from '../services/api/api.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TeamService } from '../services/teams/team.service';
import { SpinnerService } from '../services/spinner/spinner.service';
import { BehaviorSubject } from 'rxjs';
import { ErrorService } from '../services/error/error.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit, OnDestroy {

  createTeamDisabled: BehaviorSubject<boolean>
  team: TeamDTO =     {
    teamType: "",
    teamName: "",
    organizationName: "",
    location: "",
    discipline: {name: ""},
  } as TeamDTO

  constructor(
    public apiService: ApiService,
    private dialogRef: MatDialog,
    public teamService: TeamService,
    public spinnerService: SpinnerService,
    public errorService: ErrorService
  ) {
    this.createTeamDisabled = new BehaviorSubject(true);
  }

  ngOnInit(): void {

    console.log(this.apiService.sportsDisciplines)
  }

  ngOnDestroy(): void {
    this.teamService.menuAction();
  }

  validateData(): void {
    if(this.team.teamName.length < 1 || this.team.teamType.length < 1 || this.team.discipline.name.length < 1){
      this.createTeamDisabled.next(true);
    }
    this.createTeamDisabled.next(false);
  }

  onChangeType(event: any) {
    this.team.teamType = event.value;
    this.validateData();
 }

  onChangeDiscipline(event: any) {
    this.team.discipline.name = event.value;
    this.validateData();
  }

  createTeam(): void {
    this.apiService.createTeam(this.team, this.apiService.userToken!);
    this.dialogRef.closeAll();
    this.spinnerService.show();
    this.teamService.getTeamAmount();
  }
}
