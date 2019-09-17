import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentscheduleComponent } from './appointmentschedule.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Appointment Schedule',
      rtltitle: 'جدول المواعيد'
    },
    component: AppointmentscheduleComponent
  }
];

@NgModule({
  imports: [FormsModule,
     CommonModule,
    ReactiveFormsModule,  
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    RouterModule.forChild(routes)],

  declarations: [AppointmentscheduleComponent
   // ,SidelinksComponent
  ]
})

export class AppointmentscheduleModule {  }
