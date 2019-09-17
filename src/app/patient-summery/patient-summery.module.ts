import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PatientSummeryComponent } from  './patient-summery.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'PatientSummery',
      // rtltitle: 'عنابر'
    },
    component: PatientSummeryComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [PatientSummeryComponent]
})
export class PatientSummeryModule { }
