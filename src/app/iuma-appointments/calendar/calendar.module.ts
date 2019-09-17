
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { SpinnerComponent } from '../shared/spinner.component'
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
const routes: Routes = [
  {
    path: '',
    data: {
    //   title: 'Add Invoice',
    //   rtltitle: 'ذلك. لا تمانع'
    },
    component: CalendarComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(routes)],
    
  declarations: [CalendarComponent]
})
export class CalendarModule { }




