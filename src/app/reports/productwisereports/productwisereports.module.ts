import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ProductwisereportsComponent } from './productwisereports.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Product Wise Reports',
      rtltitle: 'تقارير المنتج الحكيم'
    },
    component: ProductwisereportsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule,   
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,  
    RouterModule.forChild(routes)],
  declarations: [ProductwisereportsComponent
   // ,SidelinksComponent
  ]
})

export class ProductwisereportsModule {  }
