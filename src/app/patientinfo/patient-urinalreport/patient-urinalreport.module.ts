import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PatientUrinalreportComponent } from './patient-urinalreport.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Urinalysis Reports',
      rtltitle: 'الأطباء'
    },
    component: PatientUrinalreportComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
  declarations: [PatientUrinalreportComponent
  ]
})

export class PatientUrinalsModule {  }
