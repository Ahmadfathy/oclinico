import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditbankbranchmasterComponent } from './editbankbranchmaster.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: EditbankbranchmasterComponent
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule,
   
CommonModule, RouterModule.forChild(routes)],
  declarations: [EditbankbranchmasterComponent]
})
export class EditbankbranchmasterModule { }
