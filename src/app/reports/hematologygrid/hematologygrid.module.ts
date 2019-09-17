import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HematologygridComponent } from './hematologygrid.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'hematology',
      rtltitle: 'نفقات'
    },
    component: HematologygridComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,     
    RouterModule.forChild(routes)],
  declarations: [HematologygridComponent
    //,SidelinksComponent
  ],
  exports: [HematologygridComponent],
})

export class HematologygridModule {  }
