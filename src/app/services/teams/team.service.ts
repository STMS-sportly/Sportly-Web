import { Injectable } from '@angular/core';
import { team } from 'src/app/users-teams/team-interface';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  userName: string = '';
  id: number = 0;
  isTeamViewActive: boolean = false

  public dataColor: any;
  constructor(
    public apiService: ApiService
  ) { }

  isTeamEmpty(): boolean{
    if(this.apiService.teams.length > 0){
      return false;
    }else{
      return true;
    }
  }

  getTeamID(index: number): number {
    return this.apiService.teams[index].id;
  }

  getTeamIconBackgroundColor(index: number): string {
    // this.image!.s = this.teamIconFootball;
    if(this.apiService.teams[index].discipline.name === 'Football'){
      this.dataColor = '#D2F6F6';
    } else if(this.apiService.teams[index].discipline.name === 'Basketball'){
      this.dataColor = '#E0F6D2';
    } else if(this.apiService.teams[index].discipline.name === 'Volleyball'){
      this.dataColor = '#E0D2F6';
    } else if(this.apiService.teams[index].discipline.name === 'Handball'){
      this.dataColor = '#E0D2F6';
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
      this.dataColor = '#E0D2F6';
    } else if(this.apiService.teamDetails.discipline.name === 'Handball'){
      this.dataColor = '#E0D2F6';
    }
    else {
      this.dataColor = '';
    }
    return this.dataColor;
  }

  isAdmin(index: number): boolean {
    let isUserAdmin = false;
    if(this.apiService.teams[index].role === "ProAdmin"){
      isUserAdmin = true;
    }else if(this.apiService.teams[index].role === "Admin"){
      isUserAdmin = true;
    }
    return isUserAdmin;
  }

  isAssistant(index: number): boolean {
    let isUserAssistant = false;
    if(this.apiService.teams[index].role === "Assistant"){
      isUserAssistant = true
    }
    return isUserAssistant;
  }

  getUser(index: number): void {
    this.id = this.apiService.teamDetails.members[index].id;
    this.userName = this.apiService.teamDetails.members[index].firstName + ' ' + this.apiService.teamDetails.members[index].lastName;
  }

  isTeamProffesional(): boolean {
    if(this.apiService.teamDetails.teamType === 'Professional'){
      return true;
    } else {
      return false;
    }
  }
}
