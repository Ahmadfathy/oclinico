import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AddbankbranchmasterComponent } from './addbankbranchmaster.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AddbankbranchmasterComponent }];
@NgModule({
  declarations: [AddbankbranchmasterComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AddbankbranchmasterModule { } 