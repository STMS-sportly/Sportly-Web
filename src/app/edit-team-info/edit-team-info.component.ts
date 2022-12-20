import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
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
export class EditTeamInfoComponent implements OnInit{

  newTeamName: string = '';
  newOrgName: string = '';
  newLocation: string = '';

  constructor(
    public readonly teamService: TeamService,
    private readonly router: Router,
    public apiService: ApiService,
    private dialogRef: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    this.apiService.getTeamDetails(this.apiService.teamDetails.id, userToken!);
  }

  onChangeName(event: any) {this.newTeamName = event.target.value;}
  onChangeOrg(event: any) {this.newOrgName = event.target.value;}
  onChangeLocation(event: any) {this.newLocation = event.target.value;}

  async editTeam(): Promise<void> {
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    this.apiService.updateTeam(this.apiService.teamDetails.id, this.newTeamName, this.newLocation, this.newOrgName, userToken!)
    this.dialogRef.closeAll();
    this.apiService.getTeamDetails(this.apiService.teamDetails.id, userToken!);
  }
}
