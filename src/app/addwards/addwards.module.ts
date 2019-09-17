import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AddwardsComponent } from '../addwards/addwards.component';
const routes: Routes = [
  { path: '', component: AddwardsComponent }];
@NgModule({
  declarations: [AddwardsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AddwardsModule { } 