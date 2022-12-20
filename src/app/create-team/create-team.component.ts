import { Component, OnInit } from '@angular/core';
import { TeamDTO } from '../models/team';
import { ApiService } from '../services/api/api.service'
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  team: TeamDTO =
    {
      id: -1,
      teamType: "",
      teamName: "",
      organizationName: "",
      location: "",
      discipline: {name: ""},
      membersCount: -1,
      role: ""
    }

    isTeamDataValid: boolean = true;

  constructor(
    public apiService: ApiService,
    private router: Router,
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {

    console.log(this.apiService.sportsDisciplines)
  }

  validateData(): void {
    if(this.team.teamName.length === 0
      || this.team.teamType.length === 0){
      this.isTeamDataValid = false;
    } else {
      this.isTeamDataValid = true;
    }
  }

  onChangeType(event: any) {
    this.team.teamType = event.target.value;
 }

 onChangeDiscipline(event: any) {
  this.team.discipline.name = event.target.value;
}

  async createTeam(): Promise<void> {
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    this.validateData();
    if(this.isTeamDataValid){
      this.apiService.createTeam(this.team, userToken!);
    } else {
      console.log("INVALID DATA");
    }
    this.dialogRef.closeAll();
    this.apiService.getTeams(userToken!);

  }
}
