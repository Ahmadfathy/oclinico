import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MDepartmentspecificationsComponent } from './m-departmentspecifications.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MDepartmentspecificationsComponent }];
@NgModule({
  declarations: [MDepartmentspecificationsComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MDepartmemtdetailssettingsModule { } 