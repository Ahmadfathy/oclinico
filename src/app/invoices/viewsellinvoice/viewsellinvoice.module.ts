import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSellinvoiceComponent } from './viewsellinvoice.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClickoutsideDirective } from './clickoutside.directive';
import { ViewSellinvoiceServices } from './viewsellinvoice.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Add Sell Invoice',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: ViewSellinvoiceComponent
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
    ViewSellinvoiceServices
  ],
  declarations: [
    ViewSellinvoiceComponent,
    ClickoutsideDirective
  ]
})

export class ViewSellinvoiceModule { }
