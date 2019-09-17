import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ViewtransferComponent } from './viewtransfer.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'viewtransferreport',
      rtltitle: 'نفقات'
    },
    component: ViewtransferComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
  declarations: [ViewtransferComponent
  ]
})

export class ViewtransferModule {  }
