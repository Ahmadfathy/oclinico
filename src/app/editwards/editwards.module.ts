import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EditwardsComponent } from '../editwards/editwards.component';


const routes: Routes = [
  { path: '', component: EditwardsComponent }];
@NgModule({
  declarations: [EditwardsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EditwardsModule { } 