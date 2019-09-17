import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BalanceComponent } from './balance.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Balance',
      rtltitle: 'توازن '
    },
    component: BalanceComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule,   
    OwlDateTimeModule, 
    OwlNativeDateTimeModule, 
    RouterModule.forChild(routes)],
  declarations: [BalanceComponent
   // ,SidelinksComponent
  ]
})

export class BalanceModule {  }
