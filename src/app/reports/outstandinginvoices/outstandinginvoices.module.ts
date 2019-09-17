import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OutstandinginvoicesComponent } from './outstandinginvoices.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Outstanding Invoices',
      rtltitle: 'الفواتير المستحقة'
    },
    component: OutstandinginvoicesComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
  declarations: [OutstandinginvoicesComponent
   // ,SidelinksComponent
  ]
})

export class OutstandinginvoicesModule {  }
