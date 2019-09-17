import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewWardsComponent } from '../view-wards/view-wards.component';
const routes: Routes = [
  { path: '', component: ViewWardsComponent }];
@NgModule({
  declarations: [ViewWardsComponent],
  imports: [
    CommonModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class viewwardsModule { } 