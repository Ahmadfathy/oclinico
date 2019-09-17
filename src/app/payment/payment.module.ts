

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTablesModule } from 'angular-datatables';

import { paymentsRoutes } from './payment.routing';
// const routes: Routes = [
//   {
//     path: '',
//     data: {
//       title: 'Payment Information',
//       rtltitle: 'معلومات الدفع'
//     },
//     component: PaymentComponent
//   }
// ];

@NgModule({
  imports: [FormsModule, 
    CommonModule, 
    RouterModule.forChild(paymentsRoutes),
    DataTablesModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()],
  declarations: [PaymentComponent]
})
export class GetpaymentModule { }
