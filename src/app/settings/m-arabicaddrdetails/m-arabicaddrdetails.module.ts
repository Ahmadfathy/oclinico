import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MArabicaddrdetailsComponent } from './m-arabicaddrdetails.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MArabicaddrdetailsComponent }];
@NgModule({
  declarations: [MArabicaddrdetailsComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MArabicaddrdetailsModule { } 