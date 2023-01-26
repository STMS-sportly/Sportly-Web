import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { ApiService } from '../services/api/api.service';
import { TeamService } from '../services/teams/team.service';

@Component({
  selector: 'app-edit-team-info',
  templateUrl: './edit-team-info.component.html',
  styleUrls: ['./edit-team-info.component.css']
})
export class EditTeamInfoComponent implements OnInit, OnDestroy{

  editTeamDisabled = false;

  constructor(
    public readonly teamService: TeamService,
    private readonly router: Router,
    public apiService: ApiService,
    private dialogRef: MatDialog
  ) { }

  ngOnDestroy(): void {
    this.teamService.menuAction();
  }

  async ngOnInit(): Promise<void> {
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    this.apiService.getTeamDetails(this.apiService.teamDetails.id, userToken!);
  }

  validateDate(): void {
    if(this.apiService.teamDetails.teamName.length < 1){
      this.editTeamDisabled = true;
    } else {
      this.editTeamDisabled = false;
    }
  }

  onChangeName(event: any) {
    this.apiService.teamDetails.teamName = event.target.value;
    this.validateDate();
  }
  onChangeOrg(event: any) {this.apiService.teamDetails.organizationName = event.target.value;}
  onChangeLocation(event: any) {this.apiService.teamDetails.location = event.target.value;}

  editTeam(): void {
    this.apiService.updateTeam(this.apiService.teamDetails.id,
                              this.apiService.teamDetails.teamName,
                              this.apiService.teamDetails.location!,
                              this.apiService.teamDetails.organizationName!,
                              this.apiService.userToken!);
    this.dialogRef.closeAll();
  }
}
