import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RequestforcheckupComponent } from './requestforcheckup.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Transfor report',
      rtltitle: 'جدول المواعيد'
    },
    component: RequestforcheckupComponent
  }
];

@NgModule({
  imports: [FormsModule,
     CommonModule,
    ReactiveFormsModule,  
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    RouterModule.forChild(routes)],

  declarations: [RequestforcheckupComponent
   // ,SidelinksComponent
  ]
})

export class RequestforcheckupModule {  }
