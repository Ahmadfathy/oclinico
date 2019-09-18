import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyinvoiceComponent } from './buyinvoice.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClickoutsideDirective } from './clickoutside.directive';
import { BuyinvoiceServices } from './buyinvoice.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Add Buy Invoice',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: BuyinvoiceComponent
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
    BuyinvoiceServices
  ],
  declarations: [
    BuyinvoiceComponent,
    ClickoutsideDirective
  ]
})

export class BuyinvoiceModule { }
