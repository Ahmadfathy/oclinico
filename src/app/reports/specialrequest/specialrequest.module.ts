import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SpecialrequestComponent } from './specialrequest.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'specialrequest',
      rtltitle: 'نفقات'
    },
    component: SpecialrequestComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
  declarations: [SpecialrequestComponent
    //,SidelinksComponent
  ]
})

export class SpecialrequestModule {  }
