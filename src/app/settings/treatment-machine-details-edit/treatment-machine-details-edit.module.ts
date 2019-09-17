import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// import { Title, Meta } from '@angular/platform-browser';
import { TreatmentMachineDetailsEditComponent } from './treatment-machine-details-edit.component';


const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: TreatmentMachineDetailsEditComponent
  }
];

@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule,
     CommonModule, RouterModule.forChild(routes)],
  declarations: [TreatmentMachineDetailsEditComponent]
})

export class TreatmentMachineDetailsEditModule { }
