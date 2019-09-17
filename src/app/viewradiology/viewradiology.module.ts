import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewradiologyComponent } from '../viewradiology/viewradiology.component';
const routes: Routes = [
  { path: '', component: ViewradiologyComponent }];
@NgModule({
  declarations: [ViewradiologyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class viewradiologyModule { } 