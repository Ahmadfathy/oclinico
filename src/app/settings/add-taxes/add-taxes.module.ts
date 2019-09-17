import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddTaxesComponent } from './add-taxes.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Add Communication',
      rtltitle: 'إضافة المحادثات'
    },
    component: AddTaxesComponent
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [AddTaxesComponent]
})
export class AddTaxesModule { }
