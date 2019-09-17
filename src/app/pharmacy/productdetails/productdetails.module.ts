import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule,  } from '@angular/router';
import {ProductdetailsComponent } from './productdetails.component';
import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { from } from 'rxjs';



const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: ProductdetailsComponent
  }
];



@NgModule({
  imports: [
        FormsModule, 
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(routes)
      ],
       
  declarations: [
    ProductdetailsComponent,
    
  
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class ProductdetailsModule { }