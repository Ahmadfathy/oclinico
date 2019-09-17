import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewLaboratoryComponent } from '../view-laboratory/view-laboratory.component';
const routes: Routes = [
  { path: '', component: ViewLaboratoryComponent }];
@NgModule({
  declarations: [ViewLaboratoryComponent],
  imports: [
    CommonModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class viewlaboratoryModule { } 