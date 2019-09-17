import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CashreportComponent } from './cashreport.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cash Report',
      rtltitle: 'تقرير النقدية'
    },
    component: CashreportComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,     
    RouterModule.forChild(routes)],
  declarations: [CashreportComponent
    //,SidelinksComponent
  ]
})

export class CashreportModule {  }
