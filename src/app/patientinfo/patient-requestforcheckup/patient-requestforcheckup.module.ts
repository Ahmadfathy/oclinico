import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PatientRequestforcheckupComponent } from './patient-requestforcheckup.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Request for checkup',
      rtltitle: 'جدول المواعيد'
    },
    component: PatientRequestforcheckupComponent
  }
];

@NgModule({
  imports: [FormsModule,
     CommonModule,
    ReactiveFormsModule,  
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    RouterModule.forChild(routes)],

  declarations: [PatientRequestforcheckupComponent]
})

export class PatientRequestforcheckupModule {  }
