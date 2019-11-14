import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, } from '@angular/router';
import { DxTreeListModule } from 'devextreme-angular';
import { TreeComponent } from './tree.component';
import { Employee } from './tree.service'


const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: TreeComponent
  }
];

@NgModule({
  declarations: [TreeComponent],
  providers: [Employee],
  imports: [
    CommonModule,
    DxTreeListModule,
    RouterModule.forChild(routes)
  ]
})
export class TreeModule { }
