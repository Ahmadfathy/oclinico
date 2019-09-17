import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddtreatmentComponent } from './addtreatment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import {SidelinksModule } from '../sidelinks/sidelinks.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: AddtreatmentComponent
  }
];

@NgModule({
  imports: [ FormsModule, ReactiveFormsModule , CommonModule,
    SidelinksModule,NgbModule,
   RouterModule.forChild(routes)],
  declarations: [AddtreatmentComponent]
})

export class AddtreatmentModule { }
