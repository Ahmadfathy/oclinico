import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddprescriptionComponent } from './addprescription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import {SidelinksModule } from '../sidelinks/sidelinks.module'

const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: AddprescriptionComponent
  }
];
//SidelinksModule
@NgModule({
  imports: [ CommonModule,
    SidelinksModule, FormsModule, ReactiveFormsModule,
     RouterModule.forChild(routes),],
  declarations: [AddprescriptionComponent]
})

export class AddprescriptionModule { }
