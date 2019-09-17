import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { Report8evComponent } from './report8ev.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Transfor report',
      rtltitle: 'جدول المواعيد'
    },
    component: Report8evComponent
  }
];

@NgModule({
  imports: [FormsModule,
     CommonModule,
    ReactiveFormsModule,  
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    RouterModule.forChild(routes)],

  declarations: [Report8evComponent]
})

export class Report8evprintModule {  }
