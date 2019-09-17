import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';



export const productsRoutes: Routes = [  {  path: '',
component: ProductsComponent}];






// export const productsRoutes: Routes = [
//   {
//     path: '',
//     children: [
//       {
//         path: 'product',
//         component: ProductsComponent
//       },
//       {
//         path: 'addproduct',
//         loadChildren: './add-product/add-product.module#AddProductModule'
//       },
//       {
//         path: 'editproduct',
//         loadChildren: './edit-product/edit-product.module#EditProductModule'
//       },
//       {
//         path: 'viewproduct',
//         loadChildren: './view-product/view-product.module#ViewProductModule'
//       },
//       {
//         path: 'stockadjustment',
//         loadChildren: './stockadjustment/stockadjustment.module#StockadjustmentModule'
//       },
//       {
//         path: 'advancesearch',
//         loadChildren: './advancesearch/advancesearch.module#AdvancesearchModule'
//       },
     
//     ]
//   }
// ];
