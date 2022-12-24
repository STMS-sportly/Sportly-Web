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
import { EventDTO } from '../models/event';
import { ApiService } from '../services/api/api.service'

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
      public apiService: ApiService) {}
    @ViewChild('popup', { static: false })
    popup!: MbscPopup;
    @ViewChild('colorPicker', { static: false })
    colorPicker: any;
    popupEventTitle: string | undefined;
    popupEventDescription: string | undefined;
    popupEventAllDay = true;
    popupEventDates: any;
    popupEventStatus = 'busy';
    calendarSelectedDate: any = new Date();
    switchLabel: any = 'All-day';
    tempColor = '';
    selectedColor = '';
    colorAnchor: HTMLElement | undefined;
    colors = ['#ffeb3c', '#ff9900', '#f44437', '#ea1e63', '#9c26b0', '#3f51b5', '', '#009788', '#4baf4f', '#7e5d4e'];
    myEvents: MbscCalendarEvent[] = [];
    teamEvent = this.apiService.teamEvents
    tempEvent = this.apiService.event;
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
                // refresh the list, if add popup was canceled, to remove the temporary event
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
                handler: (ev) => {
                    this.selectedColor = this.tempColor;
                    this.colorPicker.close();
                },
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
        this.popupEventTitle = event.title;
        this.popupEventDescription = event['description'];
        this.popupEventDates = this.calendarSelectedDate;
    }
    async saveEvent(): Promise<void> {
      const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
        this.tempEvent.title = this.popupEventTitle!;
        this.tempEvent.description = this.popupEventDescription!;
        this.tempEvent.eventDate = this.popupEventDates[0]!;
        if (this.isEdit) {
            // update the event in the list
            this.myEvents = [...this.myEvents];
            // here you can update the event in your storage as well
            // ...
        } else {
            // add the new event to the list
            this.myEvents = [...this.myEvents, this.tempEvent];
            // here you can add the event to your storage as well
            // ...
        }
        // navigate the calendar
        this.calendarSelectedDate = this.popupEventDates[0];
        this.apiService.createEvent(this.apiService.teamDetails.id, this.tempEvent.eventDate, this.tempEvent.title, this.tempEvent.description, userToken!);
        // close the popup
        this.popup.close();
    }
    deleteEvent(event: MbscCalendarEvent): void {
        this.myEvents = this.myEvents.filter(item => item.id !== event.id);
        this.notify.snackbar({
            button: {
                action: () => {
                    this.myEvents = [...this.myEvents, event];
                },
                text: 'Undo'
            },
            message: 'Event deleted'
        });
        // here you can delete the event from your storage as well
        // ...
    }
    onDeleteClick(): void {
        this.deleteEvent(this.tempEvent);
        this.popup.close();
    }
}
