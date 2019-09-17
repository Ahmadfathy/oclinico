import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HematologyComponent } from './hematology.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'hematology',
      rtltitle: 'نفقات'
    },
    component: HematologyComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,     
    RouterModule.forChild(routes)],
  declarations: [HematologyComponent
    //,SidelinksComponent
  ],
  exports: [HematologyComponent],
})

export class HematologyModule {  }
