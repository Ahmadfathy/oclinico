import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TaxesComponent } from './taxes.component';


const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: TaxesComponent
  }
];

@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule,
     CommonModule, RouterModule.forChild(routes)],
  declarations: [TaxesComponent]
})

export class TaxesModule { }
