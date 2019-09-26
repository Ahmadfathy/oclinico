import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestProductComponent } from './requestproduct.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClickoutsideDirective } from './clickoutside.directive';
import { RequestProductServices } from './requestproduct.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Request Product',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: RequestProductComponent
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
    RequestProductServices
  ],
  declarations: [
    RequestProductComponent,
    ClickoutsideDirective
  ]
})

export class RequestProductModule { }
