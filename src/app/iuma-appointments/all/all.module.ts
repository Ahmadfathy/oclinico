
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './all.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { SpinnerComponent } from '../shared/spinner.component'
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
const routes: Routes = [
  {
    path: '',
    data: {
    //   title: 'Add Invoice',
    //   rtltitle: 'ذلك. لا تمانع'
    },
    component: AllComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(routes)],
    
  declarations: [AllComponent]
})
export class AllModule { }




