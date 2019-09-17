import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AddbankmasterComponent } from './addbankmaster.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AddbankmasterComponent }];
@NgModule({
  declarations: [AddbankmasterComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AddbankmasterModule { } 