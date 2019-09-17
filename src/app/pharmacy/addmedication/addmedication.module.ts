import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddmedicationComponent } from './addmedication.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'New Payment',
      rtltitle: 'دفع جدي'
    },
    component: AddmedicationComponent
  }
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule,
    CommonModule, RouterModule.forChild(routes)],
  declarations: [AddmedicationComponent]
})

export class AddmedicationComponentModule { 

}