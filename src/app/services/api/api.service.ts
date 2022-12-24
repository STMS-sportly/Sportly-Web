import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { TeamDetailsDTO, TeamDTO } from 'src/app/models/team';
import { InvitationCode } from 'src/app/models/invitation-code';
import { EventDTO } from 'src/app/models/event';

interface User {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'https://sportly-stms.azurewebsites.net';
  public event: EventDTO = {} as EventDTO;
  public teamEvents: EventDTO[] = [];
  public teams: TeamDTO[] = [];
  public teamDetails: TeamDetailsDTO = {
    teamName: '',
    organizationName: '',
    sportType: '',
    members: [],
    discipline: {name: ''},
    id: -1,
    isAdmin: false,
    joinedDate: null,
    location: '',
    membersCount: -1,
    name: '',
    teamType: ''
  }
  public sportsDisciplines: {name: string}[] = [];
  public invitationCode: InvitationCode = {
    code: ''
  };

  constructor(private http: HttpClient) { }

  public getTeams(token: string): void{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json").set('idToken', token);

    this.http.get(`${this.API_URL}/team/GetTeams`, {headers: headers})
      .subscribe((res: any) => {
        this.teams = res.teams;
      });
  }

  public createTeam(team: TeamDTO, token: string): void {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json").set('idToken', token);
    this.http.post(`${this.API_URL}/team/CreateTeam`, team, {headers: headers} )
      .subscribe((res) => {
        console.log(res);
    });
  }

  getTeamDetails(id: number, token: string): void {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json").set('idToken', token);
    this.http.get(`${this.API_URL}/team/GetTeamDetails/` + id, {headers: headers})
      .subscribe((res: any) => {
        this.teamDetails = res;
    });
  }

  getDisciplines(token: string): void {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json").set('idToken', token);
    this.http.get(`${this.API_URL}/team/GetDisciplines`, {headers: headers})
      .subscribe((res: any) => {
        this.sportsDisciplines = res.disciplines;
    });
  }

  getTeamCode(id: number, token: string): void {
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', "application/json")
      .set('idToken', token);
    this.http.get(`${this.API_URL}/team/GetTeamCode/` + id, {headers: headers})
      .subscribe((res: any) => {
        this.invitationCode = res;
    });
  }

  joinTeam(code: string, token: string): void {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json").set('idToken', token);
    this.http.post(`${this.API_URL}/team/JoinTeam`, {"code": code}, {headers: headers} )
      .subscribe((res) => {
        console.log(res);
    });
  }

  deleteTeam(id: number, token: string): void {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json").set('idToken', token);
    this.http.delete(`${this.API_URL}/team/DeleteTeam/` + id, {headers: headers} )
    .subscribe((res) => {
      console.log(res);
  });
  }

  leaveTeam(id: number, token: string): void {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json").set('idToken', token);
    this.http.post(`${this.API_URL}/team/LeaveTeam/` + id, this.teams, {headers: headers} )
      .subscribe((res) => {
        console.log(res);
    });
  }

  removeUserFromTeam(teamId: number, userId: number, token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json").set('idToken', token);
    this.http.delete(`${this.API_URL}/team/RemoveMember/` + teamId + `/` + userId, {headers: headers})
    .subscribe((res) => {
      console.log(res);
    });
  }

  updateTeam(teamId: number, newTeamName: string, newLocation: string, newOrganizationName: string, token: string): void {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json").set('idToken', token);
    this.http.put(`${this.API_URL}/team/UpdateTeam/` + teamId, {"newTeamName": newTeamName ,"newLocation": newLocation,"newOrganizationName": newOrganizationName}, {headers: headers})
    .subscribe((res) => {
      console.log(res);
    });
  }

  changeMemberRole(teamId: number, userId: number, newRole: string, token: string): void {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json").set('idToken', token);
    this.http.put(`${this.API_URL}/team/ChangeMemberRole/` + teamId + '/' + userId, {"newRole": newRole}, {headers: headers})
    .subscribe((res) => {
      console.log(res);
    });
  }

  createEvent(teamId: number, eventDate: string, title: string, description: string, token: string): void {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json").set('idToken', token);
    this.http.post(`${this.API_URL}/schedule/CreateEvent/` + teamId, {"eventDate": eventDate, "title": title, "description": description}, {headers: headers} )
    .subscribe((res) => {
      console.log(res);
    });
  }

  getMonthEvents(teamId: number,token: string): void {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json").set('idToken', token);
    let params = new HttpParams();
    params = params.append('date', new Date().toDateString());
    this.http.get(`${this.API_URL}/schedule/GetMonthEvents/` + teamId, {headers: headers, params: params})
    .subscribe((res: any) => {
      this.teamEvents = res.events;
      console.log(res);
      console.log(this.teamEvents)
    });
  }

  getDayEvents(teamId: number,token: string): void {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json").set('idToken', token);
    let params = new HttpParams();
    params = params.append('date', new Date().toDateString());
    this.http.get(`${this.API_URL}/schedule/GetDayEvents/` + teamId, {headers: headers, params: params})
    .subscribe((res) => {
      console.log(res);
    });
  }
}
