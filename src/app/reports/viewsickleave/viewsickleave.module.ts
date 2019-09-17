import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ViewsickleaveComponent } from './viewsickleave.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'viewsickleave',
      rtltitle: 'نفقات'
    },
    component: ViewsickleaveComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
  declarations: [ViewsickleaveComponent
  ]
})

export class ViewsickleaveModule {  }
