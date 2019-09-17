import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditPaymentsComponent } from './edit-payments.component';

const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Edit Payments',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: EditPaymentsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [EditPaymentsComponent]
})

export class EditPaymentsModule { }
