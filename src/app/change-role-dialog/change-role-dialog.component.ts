import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import firebase from 'firebase/compat/app';
import { ApiService } from '../services/api/api.service';
import { TeamService } from '../services/teams/team.service';

@Component({
  selector: 'app-change-role-dialog',
  templateUrl: './change-role-dialog.component.html',
  styleUrls: ['./change-role-dialog.component.css']
})
export class ChangeRoleDialogComponent {

  userRoles: string = '';
  roles: string[] = ['ProAdmin', 'Assistant', 'ProPlayer'];
  amateurRoles : string[] = ['Admin', 'Player']

  constructor(
    public apiService: ApiService,
    public readonly teamService: TeamService,
    private dialogRef: MatDialog
  ){}

  async changeUserRole(): Promise<void> {
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    this.apiService.changeMemberRole(this.apiService.teamDetails.id, this.teamService.id, this.userRoles, userToken!);
    this.dialogRef.closeAll();
    this.apiService.getTeamDetails(this.apiService.teamDetails.id, userToken!);
  }
}
