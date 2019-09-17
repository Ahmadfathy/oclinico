import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Report7gridComponent } from './report7grid.component';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    component: Report7gridComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,     
    RouterModule.forChild(routes)],
  declarations: [Report7gridComponent
    //,SidelinksComponent
  ],
  
})

export class Report7GridModule {  }
