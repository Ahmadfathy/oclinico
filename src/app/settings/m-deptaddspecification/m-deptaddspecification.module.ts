import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MDeptaddspecificationComponent } from './m-deptaddspecification.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MDeptaddspecificationComponent }];
@NgModule({
  declarations: [MDeptaddspecificationComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MDeptaddspecificationModule { } 