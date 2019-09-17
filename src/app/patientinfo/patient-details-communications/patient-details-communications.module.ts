import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailsCommunicationsComponent } from './patient-details-communications.component';
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
    component: PatientDetailsCommunicationsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,
    SidelinksModule,
     RouterModule.forChild(routes)],
  declarations: [PatientDetailsCommunicationsComponent]
})

export class PatientDetailsCommunicationsModule { }
