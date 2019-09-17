import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdddocumenttypesettingsComponent } from './adddocumenttypesettings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AdddocumenttypesettingsComponent }];
@NgModule({
  declarations: [AdddocumenttypesettingsComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdddocumenttypesettingsModule { } 