import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddvisitnoteComponent } from './addvisitnote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import {SidelinksModule } from '../sidelinks/sidelinks.module'
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: AddvisitnoteComponent
  }
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule,
    SidelinksModule,OwlDateTimeModule, OwlNativeDateTimeModule ,
    CommonModule, RouterModule.forChild(routes)],
  declarations: [AddvisitnoteComponent]
})

export class AddvisitnoteModule { }