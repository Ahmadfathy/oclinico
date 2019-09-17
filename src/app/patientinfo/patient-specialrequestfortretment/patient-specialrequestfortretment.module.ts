import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PatientSpecialrequestfortretmentComponent } from './patient-specialrequestfortretment.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'specialrequest',
      rtltitle: 'نفقات'
    },
    component: PatientSpecialrequestfortretmentComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
  declarations: [PatientSpecialrequestfortretmentComponent
  ]
})

export class PatientSpecialrequestModule {  }
