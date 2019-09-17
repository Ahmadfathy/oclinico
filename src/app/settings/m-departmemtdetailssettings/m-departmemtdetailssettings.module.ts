import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MDepartmemtdetailssettingsComponent } from './m-departmemtdetailssettings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MDepartmemtdetailssettingsComponent }];
@NgModule({
  declarations: [MDepartmemtdetailssettingsComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MDepartmemtdetailssettingsModule { } 