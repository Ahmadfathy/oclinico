import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { iumaroutes } from './iuma-appointments-routing';
//import { AllComponent } from './all/all.component';
// import { AddComponent } from './add/add.component';
// import { TodaysComponent } from './todays/todays.component';
// import { UpcomingComponent } from './upcoming/upcoming.component';
// import { CalendarComponent } from './calendar/calendar.component';
// import { RequestComponent } from './request/request.component';

@NgModule({
  declarations: [
   // AllComponent, 
    // AddComponent, 
    // TodaysComponent, 
    // UpcomingComponent, 
    // CalendarComponent, 
    // RequestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(iumaroutes),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ]
})
export class IumaAppointmentsModule { }
