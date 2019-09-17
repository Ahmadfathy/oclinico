import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditpatientComponent } from './editpatient.component';
// import { SidelinksModule } from '../sidelinks/sidelinks.module';
import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import {SidelinksModule } from '../sidelinks/sidelinks.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: EditpatientComponent
  }
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule,CommonModule,OwlDateTimeModule, OwlNativeDateTimeModule, RouterModule.forChild(routes)],
  declarations: [EditpatientComponent]
})

export class EditpatientModule { }
