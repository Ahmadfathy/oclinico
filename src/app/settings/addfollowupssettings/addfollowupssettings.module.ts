import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AddfollowupssettingsComponent } from './addfollowupssettings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AddfollowupssettingsComponent }];
@NgModule({
  declarations: [AddfollowupssettingsComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AddfollowupssettingsModule { } 