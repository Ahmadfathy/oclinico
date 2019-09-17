import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PatientTransferreportComponent } from './patient-transferreport.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'transfer patient',
      rtltitle: 'مصادر الإحالة'
    },
    component: PatientTransferreportComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
  declarations: [PatientTransferreportComponent
  ]
})

export class PatienttTransferreportsModule {  }
