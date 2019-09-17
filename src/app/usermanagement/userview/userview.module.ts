import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTablesModule } from 'angular-datatables';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserviewComponent } from './userview.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '',//Add Expenses
      rtltitle:'',//'تحرير العضو'
    },
    component: UserviewComponent
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
    NgbModule,
    NgMultiSelectDropDownModule.forRoot()],
  declarations: [UserviewComponent]
})
export class UserviewModule { }
