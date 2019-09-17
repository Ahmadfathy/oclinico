import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppointmentsComponent } from './appointments.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Appointments Information',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: AppointmentsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes),NgxDatatableModule],
  declarations: [AppointmentsComponent]
})
export class AppointmentsModule { }
