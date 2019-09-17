import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent } from './patients.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Patients',
      rtltitle: 'المرضى'
    },
    component: PatientsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule,  
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,   
    RouterModule.forChild(routes)],
  declarations: [PatientsComponent
    //,SidelinksComponent
  ]
})

export class PatientsModule {  }
