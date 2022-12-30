import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { TeamService } from '../services/teams/team.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditTeamInfoComponent } from '../edit-team-info/edit-team-info.component';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { ChangeRoleDialogComponent } from '../change-role-dialog/change-role-dialog.component';
import { SpinnerService } from '../services/spinner/spinner.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit ,OnDestroy {

  constructor(
    public apiService: ApiService,
    public readonly teamService: TeamService,
    private readonly router: Router,
    public dialog: MatDialog,
    public spinnerService: SpinnerService
  ) { }

  async ngOnInit(): Promise<void> {
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
  }

  ngOnDestroy(): void {
    this.teamService.isTeamViewActive = false;
  }

  async deleteTeam(): Promise<void> {
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    this.apiService.deleteTeam(this.apiService.teamDetails.id, userToken!);
    this.router.navigateByUrl('loginPage');
  }

  async removeUserFromTeam(index: number): Promise<void> {
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    this.apiService.removeUserFromTeam(this.apiService.teamDetails.id, this.apiService.teamDetails.members[index].id, userToken!);
  }

  async editTeam(): Promise<void> {
    this.dialog.open(EditTeamInfoComponent);
  }

  editRoles(index: number): void {
    this.teamService.getUser(index);
    this.dialog.open(ChangeRoleDialogComponent);
  }

}
