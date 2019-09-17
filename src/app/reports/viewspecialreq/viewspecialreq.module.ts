import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ViewspecialreqComponent } from './viewspecialreq.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'viewspecialreq',
      rtltitle: 'نفقات'
    },
    component: ViewspecialreqComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
    declarations: [ViewspecialreqComponent
  ]
})

export class ViewspecialreqModule {  }
