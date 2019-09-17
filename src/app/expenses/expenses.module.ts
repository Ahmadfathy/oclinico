import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesComponent } from './expenses.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTablesModule } from 'angular-datatables';
import  { expensesRoutes } from './expenses.routing';
// import { ViewexpensesComponent } from './viewexpenses/viewexpenses.component';
// const routes: Routes = [
//   {
//     path: '',
//     data: {
//       title: 'Expenses Information',
//       rtltitle: 'ذلك. لا تمانع'
//     },
//     component: ExpensesComponent
//   }
// ];

@NgModule({
  declarations: [ExpensesComponent, ],
  imports: [FormsModule, 
    CommonModule, 
    RouterModule.forChild(expensesRoutes),
    DataTablesModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()],
  
})
export class ExpensesModule { }


