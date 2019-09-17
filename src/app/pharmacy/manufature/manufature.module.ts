import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManufatureComponent } from './manufature.component';
//import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component:ManufatureComponent }];
@NgModule({
  declarations: [ManufatureComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],

})
export class ManufatureModule { }
