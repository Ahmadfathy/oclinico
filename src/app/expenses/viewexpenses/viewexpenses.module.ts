import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ViewexpensesComponent } from './viewexpenses.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTablesModule } from 'angular-datatables';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


const routes: Routes = [
  {
    path: '',
    data: {
      title: '',//Add Expenses
      rtltitle: 'ذلك. لا تمانع'
    },
    component: ViewexpensesComponent
  }
];

@NgModule({
  imports: [FormsModule, 
    CommonModule, 
    RouterModule.forChild(routes),
    DataTablesModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgMultiSelectDropDownModule.forRoot()],
  declarations: [ViewexpensesComponent]
})
export class ViewexpensesModule { }
