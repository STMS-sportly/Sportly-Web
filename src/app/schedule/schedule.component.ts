import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, View } from '@syncfusion/ej2-angular-schedule';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { ApiService } from '../services/api/api.service';
import firebase from 'firebase/compat/app';
import { L10n } from '@syncfusion/ej2-base';


L10n.load({
  'en-US': {
      'schedule': {
          'saveButton': 'Add Event',
          'cancelButton': 'Close',
          'deleteButton': 'Remove',
          'newEvent': 'Add',
      },
  }
});

@Component({
  selector: 'app-schedule',
  providers: [DayService, WeekService, MonthService],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class TeamScheduleComponent {
  public views: Array<string> = ['Day', 'Week', 'Month'];
  @ViewChild('scheduleObj', { static: true })
  public scheduleObj: ScheduleComponent | undefined;
  public selectedDate: Date = new Date();
  // public eventSettings: EventSettingsModel = {
  //     dataSource: this.apiService.events
  // };

  constructor(
    public apiService: ApiService
  ){}

  async onPopupClose(): Promise<void>{
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    if(this.apiService.events.eventDate === undefined || this.apiService.events.title === undefined){
      console.log(this.apiService.events)
    } else {
      this.apiService.createEvent(this.apiService.teamDetails.id, this.apiService.events.eventDate, this.apiService.events.title, this.apiService.events.description, userToken!);
    }
    this.scheduleObj!.addEvent(this.apiService.events);
  }
}

