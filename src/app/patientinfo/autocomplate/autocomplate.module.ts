import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AutocomplateComponent } from './autocomplate.component';
// import { SidelinksModule } from '../sidelinks/sidelinks.module';
import { SidelinksComponent } from '../sidelinks/sidelinks.component';
//import {SidelinksModule } from '../sidelinks/sidelinks.module'

const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: AutocomplateComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [AutocomplateComponent]
})

export class AutocomplateModule { }
