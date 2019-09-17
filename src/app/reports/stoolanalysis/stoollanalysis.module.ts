import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { StoolanalysisComponent } from './stoolanalysis.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'stoolanalysis',
      rtltitle: 'نفقات'
    },
    component: StoolanalysisComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    RouterModule.forChild(routes)],
  declarations: [StoolanalysisComponent
    //,SidelinksComponent
  ]
})

export class StoolanalysisModule {  }
