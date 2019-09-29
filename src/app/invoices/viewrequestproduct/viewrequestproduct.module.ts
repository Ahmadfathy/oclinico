import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRequestProductComponent } from './viewrequestproduct.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ViewRequestProductServices } from './viewrequestproduct.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'View Request Product',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: ViewRequestProductComponent
  }
];


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [
    ViewRequestProductServices
  ],
  declarations: [
    ViewRequestProductComponent
  ]
})

export class ViewRequestProductModule { }
