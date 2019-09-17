import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ExpiryproductsComponent } from './expiryproducts.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Expiry Products',
      rtltitle: 'منتجات انتهاء الصلاحية'
    },
    component: ExpiryproductsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule,  
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,   
    RouterModule.forChild(routes)],
  declarations: [ExpiryproductsComponent
    //,SidelinksComponent
  ]
})

export class ExpiryproductsModule {  }
