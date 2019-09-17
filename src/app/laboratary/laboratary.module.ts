import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LaborataryComponent } from './laboratary.component';

const routes: Routes = [
  {
    path: '',
    // data: {
    //   title: 'Laboratary Information',
    //   rtltitle: 'معلومات المختبر'
    // },
    component: LaborataryComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [LaborataryComponent]
})
export class LaborataryModule { }
