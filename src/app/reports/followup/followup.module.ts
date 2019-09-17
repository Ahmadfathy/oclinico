import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FollowupComponent } from './followup.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Followup',
      rtltitle: 'مراجعة'
    },
    component: FollowupComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
  declarations: [FollowupComponent
  ]
})

export class FollowupModule {  }
