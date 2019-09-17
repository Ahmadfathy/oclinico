import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EditdocumenttypesettingsComponent } from './editdocumenttypesettings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: EditdocumenttypesettingsComponent }];
@NgModule({
  declarations: [EditdocumenttypesettingsComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EditdocumenttypesettingsModule { } 