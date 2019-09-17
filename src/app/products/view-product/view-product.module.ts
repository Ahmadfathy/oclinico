import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ViewProductComponent } from './view-product.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'View Product',
      rtltitle: 'عرض المنتج'
    },
    component: ViewProductComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [ViewProductComponent]
})

export class ViewProductModule { }
