import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule,} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddpatientComponent } from './addpatient.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: AddpatientComponent
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule,OwlDateTimeModule, OwlNativeDateTimeModule,
   
CommonModule, RouterModule.forChild(routes)],
  declarations: [AddpatientComponent]
})
export class AddpatientModule { }
