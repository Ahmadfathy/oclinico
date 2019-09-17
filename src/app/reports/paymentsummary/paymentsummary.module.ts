import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsummaryComponent } from './paymentsummary.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Payment Summary',
      rtltitle: 'ملخص الدفع'
    },
    component: PaymentsummaryComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule, 
    RouterModule.forChild(routes)],
  declarations: [PaymentsummaryComponent
   // ,SidelinksComponent
  ]
})

export class PaymentsummaryModule { }
