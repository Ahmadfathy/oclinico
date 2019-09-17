import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MAdddepartmentsettingsComponent } from './m-adddepartmentsettings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MAdddepartmentsettingsComponent }];
@NgModule({
  declarations: [MAdddepartmentsettingsComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MAdddepartmentsettingsModule { } 