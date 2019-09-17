import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ViewxrayComponent } from './viewxray.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'xray',
      rtltitle: 'نفقات'
    },
    component: ViewxrayComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
  declarations: [ViewxrayComponent
  ]
})

export class ViewxrayModule {  }
