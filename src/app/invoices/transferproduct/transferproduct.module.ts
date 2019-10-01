import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferProductComponent } from './transferproduct.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClickoutsideDirective } from './clickoutside.directive';
import { TransferProductServices } from './transferproduct.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Transfer Product',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: TransferProductComponent
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
    TransferProductServices
  ],
  declarations: [
    TransferProductComponent,
    ClickoutsideDirective
  ]
})

export class TransferProductModule { }
