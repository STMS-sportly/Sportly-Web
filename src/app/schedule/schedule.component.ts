import { Component, ViewChild } from '@angular/core';
import {
    MbscCalendarEvent,
    MbscDatepickerOptions,
    MbscEventcalendarOptions,
    MbscPopup,
    MbscPopupOptions,
    Notifications,
    setOptions

} from '@mobiscroll/angular';
import firebase from 'firebase/compat/app';
import { map, Subscription, timer } from 'rxjs';
import { EventDTO, TeamEvent } from '../models/event';
import { TeamDTO } from '../models/team';
import { ApiService } from '../services/api/api.service'
import { TeamService } from '../services/teams/team.service';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  providers: [Notifications]
})
export class TeamScheduleComponent {
    constructor(
      private notify: Notifications,
      public apiService: ApiService,
      public teamService: TeamService)
    {}

    @ViewChild('popup', { static: false })
    popup!: MbscPopup;
    timePrefix = "Time"
    popupEventTitle: string | undefined;
    popupEventDescription: string | undefined = "";
    popupEventAllDay = true;
    popupEventDates: any;
    popupEventTime: any;
    popupEventStatus = 'busy';
    calendarSelectedDate: any = new Date();
    calendarSelectedHour: any = new Date();
    switchLabel: any = 'All-day';
    tempColor = '';
    selectedColor = '';
    colorAnchor: HTMLElement | undefined;
    colors = ['#ffeb3c', '#ff9900', '#f44437', '#ea1e63', '#9c26b0', '#3f51b5', '', '#009788', '#4baf4f', '#7e5d4e'];
    myEvents: MbscCalendarEvent[] = [];
    clickedEventId: number = -1;
    teamEvents = this.apiService.teamEvents;
    newEvent = this.apiService.event;
    tempEvent!: MbscCalendarEvent
    calendarOptions: MbscEventcalendarOptions = {
        clickToCreate: 'double',
        dragToCreate: true,
        dragToMove: true,
        dragToResize: true,
        view: {
            calendar: { type: 'month', labels: true }
        },
        onEventClick: (args) => {
            this.isEdit = true;
            this.tempEvent = args.event;
            // fill popup form with event data
            this.loadPopupForm(args.event);
            // set popup options
            this.popupHeaderText = 'Edit event';
            this.popupButtons = this.popupEditButtons;
            this.popupAnchor = args.domEvent.currentTarget;
            // open the popup
            this.popup.open();
        },
        onEventCreated: (args) => {
            setTimeout(() => {
                this.isEdit = false;
                this.tempEvent = args.event;
                // fill popup form with event data
                this.loadPopupForm(args.event);
                // set popup options
                this.popupHeaderText = 'New Event';
                this.popupButtons = this.popupAddButtons;
                this.popupAnchor = args.target;
                // open the popup
                this.popup.open();
            });
        },
        onEventDeleted: (args) => {
            setTimeout(() => {
                this.deleteEvent(args.event);
            });
        },
        onEventUpdated: (args) => {
            // here you can update the event in your storage as well, after drag & drop or resize
            // ...
        },
        onPageChange(args, inst) {

        },
    };
    popupHeaderText!: string;
    popupAnchor: HTMLElement | undefined;
    popupAddButtons = ['cancel', {
        handler: () => {
            this.saveEvent();
        },
        keyCode: 'enter',
        text: 'Add',
        cssClass: 'mbsc-popup-button-primary'
    }];
    popupEditButtons = ['cancel', {
        handler: () => {
            this.saveEvent();
        },
        keyCode: 'enter',
        text: 'Save',
        cssClass: 'mbsc-popup-button-primary'
    }];
    popupButtons: any = [];
    popupOptions: MbscPopupOptions = {
        display: 'bottom',
        contentPadding: false,
        fullScreen: true,
        onClose: () => {
            if (!this.isEdit) {
                this.myEvents = [...this.myEvents];
            }
        },
        responsive: {
            medium: {
                display: 'anchored',
                width: 400,
                fullScreen: false,
                touchUi: false
            }
        }
    };
    datePickerControls = ['date'];
    datePickerResponsive: any = {
        medium: {
            controls: ['calendar'],
            touchUi: false
        }
    };
    datetimePickerControls = ['datetime'];
    datetimePickerResponsive = {
        medium: {
            controls: ['calendar', 'time'],
            touchUi: false
        }
    };
    datePickerOptions: MbscDatepickerOptions = {
        select: 'range',
        showRangeLabels: false,
        touchUi: true
    };
    isEdit = false;
    colorOptions: MbscPopupOptions = {
        display: 'bottom',
        contentPadding: false,
        showArrow: false,
        showOverlay: false,
        buttons: [
            'cancel',
            {
                text: 'Set',
                keyCode: 'enter',
                cssClass: 'mbsc-popup-button-primary'
            }
        ],
        responsive: {
            medium: {
                display: 'anchored',
                buttons: [],
            }
        }
    };

    loadPopupForm(event: MbscCalendarEvent): void {
        var ev = this.apiService.teamEvents.find(item => item.id === event.id);
        this.popupEventTitle = event.title;
        if(ev?.description != null){
          this.popupEventDescription = ev?.description;
        }else{
          this.popupEventDescription = ""
        }
        if(this.isEdit){
          this.popupEventDates = event.date;
          this.popupEventTime = this.calendarSelectedHour;
        }else {
          this.popupEventDates = this.calendarSelectedDate;
          this.popupEventTime = this.calendarSelectedHour;
        }

        this.clickedEventId = ev?.eventId!
    }
    saveEvent(): void {
        this.tempEvent.title = this.popupEventTitle!;
        this.tempEvent.date = this.popupEventDates[0];
        this.newEvent.title = this.popupEventTitle!;
        this.newEvent.description = this.popupEventDescription!;
        this.setEventDate()

        if (this.isEdit) {
            this.myEvents = [...this.myEvents];
            this.calendarSelectedDate = this.popupEventDates[0];
            this.calendarSelectedHour = this.popupEventTime;
            this.apiService.updateEvent(this.apiService.teamDetails.id, this.clickedEventId, this.newEvent, this.apiService.userToken!)
        } else {
          this.myEvents = [...this.myEvents, this.tempEvent];
          this.calendarSelectedDate = this.popupEventDates[0];
          this.calendarSelectedHour = this.popupEventTime;
          this.apiService.createEvent(this.apiService.teamDetails.id, this.newEvent.eventDate, this.newEvent.title, this.newEvent.description!, this.apiService.userToken!);
        }
        this.popup.close();
    }
    deleteEvent(event: MbscCalendarEvent): void {
        var ev = this.apiService.teamEvents.find(item => item.id === event.id);
        var teamEventIndex = event.id!.toString().replace(/\D/g, "");
        console.log(Number(teamEventIndex) - 1);
        this.apiService.deleteEvent(this.apiService.teamDetails.id, ev!.eventId, this.apiService.userToken!);
      }

      onDeleteClick(): void {
        this.deleteEvent(this.tempEvent);
        this.popup.close();
    }

    onChangeTime(event: any){
      this.popupEventTime = event.value;
    }

    onChangeDate(event: any){
      this.popupEventDates = event.valueText
    }

    setEventDate(): void {
      var eventDate: Date = new Date(this.popupEventDates[0]);
      var eventTime: Date = new Date(this.popupEventTime);
      var day = eventDate.getDate();
      var month = eventDate.getMonth();
      var year = eventDate.getFullYear();
      var hour = eventTime.getHours();
      var minutes = eventTime.getMinutes();
      this.newEvent.eventDate = new Date(year, month, day, hour, minutes).toISOString()
      this.tempEvent.date = new Date(year, month, day, hour, minutes).toISOString()
    }

}
