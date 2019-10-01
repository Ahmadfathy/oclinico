import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClickoutsideDirective } from './clickoutside.directive';
import { InventoryServices } from './inventory.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Inventory',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: InventoryComponent
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
    InventoryServices
  ],
  declarations: [
    InventoryComponent,
    ClickoutsideDirective
  ]
})

export class InventoryModule { }
