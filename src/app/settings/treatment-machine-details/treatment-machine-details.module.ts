import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TreatmentMachineDetailsComponent } from './treatment-machine-details.component';


const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: TreatmentMachineDetailsComponent
  }
];

@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule,
     CommonModule, RouterModule.forChild(routes)],
  declarations: [TreatmentMachineDetailsComponent]
})

export class TreatmentMachineDetailsModule { }
