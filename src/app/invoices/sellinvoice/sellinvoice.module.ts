import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellinvoiceComponent } from './sellinvoice.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClickoutsideDirective } from './clickoutside.directive';
import { SellinvoiceServices } from './sellinvoice.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Add Sell Invoice',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: SellinvoiceComponent
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
    SellinvoiceServices
  ],
  declarations: [
    SellinvoiceComponent,
    ClickoutsideDirective
  ]
})

export class SellinvoiceModule { }
