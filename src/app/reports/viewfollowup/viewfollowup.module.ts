import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ViewfollowupComponent } from './viewfollowup.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Followup Reports',
      rtltitle: 'إشعار مراجعة'
    },
    component: ViewfollowupComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
  declarations: [ViewfollowupComponent
  ]})

export class viewFollowupModule {  }
