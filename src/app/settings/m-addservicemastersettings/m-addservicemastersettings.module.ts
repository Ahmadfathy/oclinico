import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MAddservicemastersettingsComponent } from './m-addservicemastersettings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MAddservicemastersettingsComponent }];
@NgModule({
  declarations: [MAddservicemastersettingsComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MAddservicemastersettingsModule { } 