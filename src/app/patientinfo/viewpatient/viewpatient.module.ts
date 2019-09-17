import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ViewpatientComponent } from './viewpatient.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import {SidelinksModule } from '../sidelinks/sidelinks.module'

const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: ViewpatientComponent
  }
];

@NgModule({
   imports: [FormsModule, CommonModule, 
    NgbModule,
    RouterModule.forChild(routes),
    SidelinksModule
  ],
  declarations: [ViewpatientComponent],
  
})

export class ViewpatientModule { }
