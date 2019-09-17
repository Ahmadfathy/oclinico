import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DoctorFeeEditComponent } from './doctor-fee-edit.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: DoctorFeeEditComponent
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule,
   
CommonModule, RouterModule.forChild(routes)],
  declarations: [DoctorFeeEditComponent]
})
export class DoctorFeeEditModule { }
