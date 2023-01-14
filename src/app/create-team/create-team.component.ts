import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeamDTO } from '../models/team';
import { ApiService } from '../services/api/api.service'
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TeamService } from '../services/teams/team.service';
import { SpinnerService } from '../services/spinner/spinner.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit, OnDestroy {

  createTeamDisabled = false
  team: TeamDTO =     {
    id: -1,
    teamType: "",
    teamName: "",
    organizationName: "",
    location: "",
    discipline: {name: ""},
    membersCount: -1,
    role: ""
  }

  constructor(
    public apiService: ApiService,
    private router: Router,
    private dialogRef: MatDialog,
    public teamService: TeamService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {

    console.log(this.apiService.sportsDisciplines)
  }

  ngOnDestroy(): void {
    this.teamService.menuAction();
  }

  validateData(): void {
    if(this.team.teamName.length < 1
      || this.team.teamType.length < 1){
      this.createTeamDisabled = true;
    } else {
      this.createTeamDisabled = false;
    }
  }

  onChangeType(event: any) {
    this.team.teamType = event.value;
 }

  onChangeDiscipline(event: any) {
    this.team.discipline.name = event.value;
  }

  async createTeam(): Promise<void> {
    this.validateData();
    this.apiService.createTeam(this.team, this.apiService.userToken!);
    this.dialogRef.closeAll();
    this.spinnerService.show();
  }
}
