import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ViewpharmacydetailsComponent } from './viewpharmacydetails.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'New Payment',
      rtltitle: 'دفع جدي'
    },
    component: ViewpharmacydetailsComponent
  }
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule,
    CommonModule, RouterModule.forChild(routes)],
  declarations: [ViewpharmacydetailsComponent]
})

export class ViewpharmacydetailsModule { 

}