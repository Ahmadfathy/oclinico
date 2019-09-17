import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { XrayComponent } from './xray.component';
// import { SidelinksModule } from '../sidelinks/sidelinks.module';
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
    component: XrayComponent
  }
];

@NgModule({
  imports: [FormsModule, SidelinksModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommonModule, RouterModule.forChild(routes)],
  declarations: [XrayComponent]
})

export class XrayModule { }
