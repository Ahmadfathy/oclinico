import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PatientReport8Component } from './patient-report8.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Human resource report',
      rtltitle: 'جدول المواعيد'
    },
    component: PatientReport8Component
  }
];

@NgModule({
  imports: [FormsModule,
     CommonModule,
    ReactiveFormsModule,  
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    RouterModule.forChild(routes)],

  declarations: [PatientReport8Component]
})

export class PatientReportprintModule {  }
