import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailsInvoicesComponent } from './patient-details-invoices.component';
// import { SidelinksModule } from '../sidelinks/sidelinks.module';
import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import {SidelinksModule } from '../sidelinks/sidelinks.module'

const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: PatientDetailsInvoicesComponent
  }
];

@NgModule({
  imports: [FormsModule,
    SidelinksModule,
     CommonModule, RouterModule.forChild(routes)],
  declarations: [PatientDetailsInvoicesComponent]
})

export class PatientDetailsInvoicesModule { }
