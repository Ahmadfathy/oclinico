import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RadiologyComponent } from '../radiology/radiology.component';
const routes: Routes = [
  { path: '', component: RadiologyComponent }];
@NgModule({
  declarations: [RadiologyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class radiologyModule { } 