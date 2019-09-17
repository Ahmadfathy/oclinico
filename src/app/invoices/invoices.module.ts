import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { invoicesRoutes } from './invoices.routing';
import { InvoicesComponent } from './invoices.component';



// const routes: Routes = [
//   {
//     path: '',
//     data: {
//       title: 'Invoice',
//       rtltitle: 'ذلك. لا تمانع'
//     },
//     component: InvoicesComponent
//   }
// ];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(invoicesRoutes)],
  declarations: [InvoicesComponent]
})

export class InvoicesModule { }
