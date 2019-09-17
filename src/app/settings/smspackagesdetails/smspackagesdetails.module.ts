import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SmspackagesdetailsComponent } from './smspackagesdetails.component';


const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: SmspackagesdetailsComponent
  }
];

@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule,
     CommonModule, RouterModule.forChild(routes)],
  declarations: [SmspackagesdetailsComponent]
})

export class SmspackagesdetailsModule { }
