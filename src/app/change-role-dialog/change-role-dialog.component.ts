import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import firebase from 'firebase/compat/app';
import { ApiService } from '../services/api/api.service';
import { TeamService } from '../services/teams/team.service';

export interface Option {
  name: string;
  value: string;
  checked: boolean;
}

@Component({
  selector: 'app-change-role-dialog',
  templateUrl: './change-role-dialog.component.html',
  styleUrls: ['./change-role-dialog.component.css']
})
export class ChangeRoleDialogComponent implements OnInit, OnDestroy{

  userRoles: string = '';
  roles: string[] = ['ProAdmin', 'Assistant', 'ProPlayer'];
  amateurRoles : string[] = ['Admin', 'Player']
  userId: number | undefined = this.teamService.userId
  radioButtonOptions: Option[] = [];

  constructor(
    public apiService: ApiService,
    public teamService: TeamService,
    private dialogRef: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.teamService.menuAction()
  }

  ngOnInit(): void {
    this.getCurrentRole();
  }

  getCurrentRole(): void {
    this.userRoles = this.teamService.getUserRole(this.userId!);
    if(this.apiService.teamDetails.teamType === "Professional"){
      for (var i = 0; i < 3; i++) {
        var defaultChecked = this.userRoles === this.roles[i];
        this.radioButtonOptions.push({
          name: this.roles[i],
          value: this.roles[i],
          checked: defaultChecked,
        });
      }
    }else {
      for (var i = 0; i < 2; i++) {
        var defaultChecked = this.userRoles === this.amateurRoles[i];
        this.radioButtonOptions.push({
          name: this.amateurRoles[i],
          value: this.amateurRoles[i],
          checked: defaultChecked,
        });
      }
    }

  }

  async changeUserRole(): Promise<void> {
    this.apiService.changeMemberRole(this.apiService.teamDetails.id, this.userId!, this.userRoles, this.apiService.userToken!);
    this.getCurrentRole();
    this.dialogRef.closeAll();
  }

}
