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
import { map, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit ,OnDestroy {

  teamId = this.teamService.teamId;
  userRole: string | undefined;
  timerSubscription!: Subscription;

  constructor(
    public apiService: ApiService,
    public readonly teamService: TeamService,
    private readonly router: Router,
    public dialog: MatDialog,
    public spinnerService: SpinnerService
  ) { }

  async ngOnInit(): Promise<void> {
    this.timerSubscription = timer(0, 500).pipe(
      map(() => {
        if(!this.teamService.isModalOpen){
          this.apiService.getMessages(this.teamId!, this.apiService.userToken!);
          this.apiService.getTeamEvents(this.teamId!, this.apiService.userToken!);
          this.apiService.getTeamDetails(this.teamId!, this.apiService.userToken!);
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.teamService.isTeamViewActive = false;
    this.timerSubscription.unsubscribe();
  }

  deleteTeam(): void {
    this.apiService.deleteTeam(this.apiService.teamDetails.id, this.apiService.userToken!);
    this.router.navigateByUrl('loginPage');
    this.spinnerService.show();
  }

  async removeUserFromTeam(index: number): Promise<void> {
    this.apiService.removeUserFromTeam(this.apiService.teamDetails.id, this.apiService.teamDetails.members[index].id, this.apiService.userToken!);
  }

  editTeam(): void {
    this.teamService.menuAction();
    this.dialog.open(EditTeamInfoComponent);
  }

  editRoles(index: number): void {
    this.teamService.menuAction();
    this.teamService.getUser(index);
    this.dialog.open(ChangeRoleDialogComponent);
  }

  menuAction(): void {
    this.teamService.menuAction();
  }
}
