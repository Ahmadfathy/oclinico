import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Add Product',
      rtltitle: 'إضافة منتج '
    },
    component: AddProductComponent
  }
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule,
    CommonModule, RouterModule.forChild(routes)],
  declarations: [AddProductComponent]
})

export class AddProductModule { }
