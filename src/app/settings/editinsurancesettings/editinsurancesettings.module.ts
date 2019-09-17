import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EditinsurancesettingsComponent } from './editinsurancesettings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: EditinsurancesettingsComponent }];
@NgModule({
  declarations: [EditinsurancesettingsComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EditinsurancesettingsModule { } 