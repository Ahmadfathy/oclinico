import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditProductComponent } from './edit-product.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Edit Product',
      rtltitle: 'تعديل المنتج '
    },
    component: EditProductComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [EditProductComponent]
})

export class EditProductModule { }
