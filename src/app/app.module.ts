import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateTeamComponent } from './create-team/create-team.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UsersTeamsComponent } from './users-teams/users-teams.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { TeamComponent } from './team/team.component';
import { ChatComponent } from './chat/chat.component';
import { AppFirebaseModule } from './app-firebase/app-firebase.module';
import { NewEventDialogComponent } from './new-event-dialog/new-event-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import { EditTeamInfoComponent } from './edit-team-info/edit-team-info.component';
import { MatTreeModule } from '@angular/material/tree';
import { ChangeRoleDialogComponent } from './change-role-dialog/change-role-dialog.component';
// import the ScheduleModule for the Schedule component
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { TeamScheduleComponent } from './schedule/schedule.component';
import { environment } from 'src/environments/environment';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CustomHttpInterceptor } from './http-interceptor';
import { NgChatModule } from 'ng-chat';
import { QRCodeModule } from 'angularx-qrcode';
import { QrCodeComponent } from './qr-code/qr-code.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MainPageComponent,
    CreateTeamComponent,
    HeaderComponent,
    HomePageComponent,
    UsersTeamsComponent,
    UserAccountComponent,
    TeamComponent,
    TeamScheduleComponent,
    ChatComponent,
    NewEventDialogComponent,
    EditTeamInfoComponent,
    ChangeRoleDialogComponent,
    QrCodeComponent
  ],
  imports: [
    MbscModule,
    QRCodeModule,
    MatProgressSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    AppFirebaseModule,
    FormsModule,
    NgOtpInputModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatRadioModule,
    CommonModule,
    NgbModalModule,
    MatDividerModule,
    MatTabsModule,
    MatTreeModule,
    ScheduleModule,
    MatChipsModule,
    DateTimePickerModule,
    NgChatModule,
  ],
  exports:[MatMenuModule],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
