import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ViewPaymentsComponent } from './view-payments.component';

const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'View Payments',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: ViewPaymentsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [ViewPaymentsComponent]
})

export class ViewPaymentsModule { }
