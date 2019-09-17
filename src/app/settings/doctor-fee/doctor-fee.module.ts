import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DoctorFeeComponent } from './doctor-fee.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: DoctorFeeComponent
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule,

CommonModule, RouterModule.forChild(routes)],
  declarations: [DoctorFeeComponent]
})
export class DoctorFeeModule { }
