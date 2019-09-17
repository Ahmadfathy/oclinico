import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddslotdetailsComponent } from './addslotdetails.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Add Communication',
      rtltitle: 'إضافة المحادثات'
    },
    component: AddslotdetailsComponent
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [AddslotdetailsComponent]
})
export class AddslotdetailsModule { }
