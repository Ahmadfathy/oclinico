import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SickleaveComponent } from './sickleave.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'sickleave',
      rtltitle: 'نفقات'
    },
    component: SickleaveComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
  declarations: [SickleaveComponent
    //,SidelinksComponent
  ]
})

export class SickleaveModule {  }
