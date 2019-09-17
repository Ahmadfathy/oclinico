import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ViewstoolanalysisComponent } from './viewstoolanalysis.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'viewstoolanalysis',
      rtltitle: 'نفقات'
    },
    component: ViewstoolanalysisComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
  declarations: [ViewstoolanalysisComponent
  ]
})

export class ViewstoolanalysisModule {  }
