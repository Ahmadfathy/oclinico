import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {StoresComponent } from './stores.component';

const routes:Routes = [
{
path:'',
data:{

},
component: StoresComponent
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
      StoresComponent
    
    ]
  })
  
  export class StoresModule { }
  