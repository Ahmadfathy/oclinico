import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EditslotdetailsComponent } from './editslotdetails.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: EditslotdetailsComponent }];
@NgModule({
  declarations: [EditslotdetailsComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EditslotdetailsModule { } 