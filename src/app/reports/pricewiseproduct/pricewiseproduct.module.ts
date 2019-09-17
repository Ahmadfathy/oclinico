import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PricewiseproductComponent } from './pricewiseproduct.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Price Wise Product',
      rtltitle: 'سعر المنتج الحكيم'
    },
    component: PricewiseproductComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule,  
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,   
    RouterModule.forChild(routes)],
  declarations: [PricewiseproductComponent
    //,SidelinksComponent
  ]
})

export class PricewiseproductModule {  }
