import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SupplierwiseproductsComponent } from './supplierwiseproducts.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Supplier Wise Products',
      rtltitle: 'المورد الحكمة المنتجات'
    },
    component: SupplierwiseproductsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule,  
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,   
    RouterModule.forChild(routes)],
  declarations: [SupplierwiseproductsComponent
    //,SidelinksComponent
  ]
})

export class SupplierwiseproductsModule {  }
