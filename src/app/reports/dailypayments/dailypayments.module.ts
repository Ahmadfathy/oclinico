import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DailypaymentsComponent } from './dailypayments.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Daily Payments',
      rtltitle: 'المدفوعات اليومية'
    },
    component: DailypaymentsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule, 
     RouterModule.forChild(routes)],
  declarations: [DailypaymentsComponent
   // ,SidelinksComponent
  ]
})

export class DailypaymentsModule { }
