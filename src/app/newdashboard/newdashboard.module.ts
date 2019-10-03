import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { newdashboardComponent } from './newdashboard.component';
// import { ChartsModule } from 'ng2-charts';

const routes: Routes = [{path: '',component: newdashboardComponent}];

@NgModule({
  imports: [
    FormsModule, 
    CommonModule, 
    RouterModule.forChild(routes),
    // ChartsModule
  
  ],
  declarations: [newdashboardComponent]
})
export class newdashboardModule { }
