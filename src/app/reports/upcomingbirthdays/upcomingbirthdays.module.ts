import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UpcomingbirthdaysComponent } from './upcomingbirthdays.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Upcoming Birthdays',
      rtltitle: 'أعياد الميلاد القادمة'
    },
    component: UpcomingbirthdaysComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule, 
    RouterModule.forChild(routes)],
  declarations: [UpcomingbirthdaysComponent
    //,SidelinksComponent
  ]
})

export class UpcomingbirthdaysModule { }
