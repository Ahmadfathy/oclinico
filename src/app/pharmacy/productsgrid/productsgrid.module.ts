import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule,  } from '@angular/router';
import { ProductsgridComponent } from './productsgrid.component';
import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClient,HttpClientModule} from '@angular/common/http';



const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: ProductsgridComponent
  }
];



@NgModule({
  imports: [
        FormsModule, 
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes)
      ],
       
  declarations: [
    ProductsgridComponent,
    
  
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class ProductsgridModule { }