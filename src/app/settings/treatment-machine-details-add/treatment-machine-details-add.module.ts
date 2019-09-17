import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TreatmentMachineDetailsAddComponent } from './treatment-machine-details-add.component';


const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: TreatmentMachineDetailsAddComponent
  }
];

@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule,
     CommonModule, RouterModule.forChild(routes)],
  declarations: [TreatmentMachineDetailsAddComponent]
})

export class TreatmentMachineDetailsAddModule { }
