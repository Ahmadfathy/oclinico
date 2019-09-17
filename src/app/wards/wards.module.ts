import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { WardsComponent } from './wards.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Wards',
      rtltitle: 'عنابر'
    },
    component: WardsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [WardsComponent]
})
export class WardsModule { }
