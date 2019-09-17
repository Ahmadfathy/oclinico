import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppointmentsComponent } from './appointments.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
//import { FullCalendarModule } from '@fullcalendar/angular'; 
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Appointments Information',     
      rtltitle: 'تفاصيل المواعيد‎'
    },
    component: AppointmentsComponent
  }
];
 
@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes),NgxDatatableModule,OwlDateTimeModule,
    OwlNativeDateTimeModule],
  declarations: [AppointmentsComponent]
})
export class AppointmentsModule { }
