import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  userName: string = '';
  teamId: number | undefined;
  userId: number | undefined;
  isTeamViewActive: boolean = false;
  isModalOpen: boolean = false;
  currentUserRole: string | undefined;
  showAdminButton: BehaviorSubject<boolean>
  public dataColor: any;
  teamAmount: number | undefined;
  clickedTeamName: string = "";

  constructor(
    public apiService: ApiService
  ) {
    this.showAdminButton = new BehaviorSubject(false);
  }

  isTeamEmpty(): boolean{
    if(this.apiService.teams!.length > 0){
      return false;
    }else{
      return true;
    }
  }

  getTeamID(index: number): number {
    this.teamId = this.apiService.teams![index].id;
    return this.teamId;
  }

  getTeamIconBackgroundColor(index: number): string {
    if(this.apiService.teams![index].discipline.name === 'Football'){
      this.dataColor = '#D2F6F6';
    } else if(this.apiService.teams![index].discipline.name === 'Basketball'){
      this.dataColor = '#E0F6D2';
    } else if(this.apiService.teams![index].discipline.name === 'Volleyball'){
      this.dataColor = '#F6F3D2';
    } else if(this.apiService.teams![index].discipline.name === 'Handball'){
      this.dataColor = '#E0D2F6';
    } else if(this.apiService.teams![index].discipline.name === 'Jogging'){
      this.dataColor = '#F6DFD2';
    }
    else {
      this.dataColor = '';
    }
    return this.dataColor;
  }

  getTeamDetailsIconBackgroundColor(): string {
    if(this.apiService.teamDetails.discipline.name === 'Football'){
      this.dataColor = '#D2F6F6';
    } else if(this.apiService.teamDetails.discipline.name === 'Basketball'){
      this.dataColor = '#E0F6D2';
    } else if(this.apiService.teamDetails.discipline.name === 'Volleyball'){
      this.dataColor = '#F6F3D2';
    } else if(this.apiService.teamDetails.discipline.name === 'Handball'){
      this.dataColor = '#E0D2F6';
    } else if(this.apiService.teamDetails.discipline.name === 'Jogging'){
      this.dataColor = '#F6DFD2';
    }
    else {
      this.dataColor = '';
    }
    return this.dataColor;
  }

  isAdmin(index: number): boolean {
    let isUserAdmin = false;
    if(this.apiService.teams![index].role === "ProAdmin"){
      isUserAdmin = true;
    }else if(this.apiService.teams![index].role === "Admin"){
      isUserAdmin = true;
    }
    return isUserAdmin;
  }

  isAssistant(index: number): boolean {
    let isUserAssistant = false;
    if(this.apiService.teams![index].role === "Assistant"){
      isUserAssistant = true
    }
    return isUserAssistant;
  }

  getUser(index: number): void {
    this.userId = this.apiService.teamDetails.members[index].id;
    this.userName = this.apiService.teamDetails.members[index].firstName + ' ' + this.apiService.teamDetails.members[index].lastName;
  }

  isTeamProffesional(): boolean {
    if(this.apiService.teamDetails.teamType === 'Professional'){
      return true;
    } else {
      return false;
    }
  }

  getUserRole(userId: number): string {
    const user = this.apiService.teamDetails.members.find(x => x.id === userId);
    if(user === undefined){
      return ""
    }else {
      return user.role
    }
  }

  getCurrentUserRole(): string {
    const user = this.apiService.teamDetails.members.find(x => x.id === this.apiService.currentUser.userId);
    this.currentUserRole = user?.role;
    return this.currentUserRole!
  }

  menuAction(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  isCurrentUserAdmin(): void {
    var role = this.getCurrentUserRole()
    if(role === "ProAdmin" || role === "Admin"){
      this.showAdminButton.next(true);
      return;
    }
    this.showAdminButton.next(false);
  }

  getTeamAmount(): number {
    if(this.apiService.teams == null){
      return -1;
    }
    this.teamAmount = this.apiService.teams.length;
    return this.teamAmount;
  }

  getTeamName(id: number): void {
    var teamName = this.apiService.teams?.find(x => x.id === id);
    this.clickedTeamName = teamName?.teamName!;
  }
}
