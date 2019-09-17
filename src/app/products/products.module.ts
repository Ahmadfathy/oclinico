import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { productsRoutes } from './products.routing';

// const routes: Routes = [
//   {
//     path: '',
//     data: {
//       title: 'Product Details',
//       rtltitle: 'تفاصيل المنتج '
//     },
//     component: ProductsComponent
//   }
// ];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(productsRoutes)],
  declarations: [ProductsComponent]
})
export class ProductsModule { }
