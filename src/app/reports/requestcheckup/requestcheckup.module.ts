import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RequestcheckupComponent } from './requestcheckup.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Transfor report',
      rtltitle: 'جدول المواعيد'
    },
    component: RequestcheckupComponent
  }
];

@NgModule({
  imports: [FormsModule,
     CommonModule,
    ReactiveFormsModule,  
    RouterModule.forChild(routes)],

  declarations: [RequestcheckupComponent
  ]
})

export class RequestcheckupModule {  }
