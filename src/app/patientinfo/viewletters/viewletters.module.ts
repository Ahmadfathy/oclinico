import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ViewlettersComponent } from './viewletters.component';
// import { SidelinksModule } from '../sidelinks/sidelinks.module';
import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import {SidelinksModule } from '../sidelinks/sidelinks.module'

const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: ViewlettersComponent
  }
];

@NgModule({
  imports: [FormsModule, SidelinksModule,
    CommonModule, RouterModule.forChild(routes)],
  declarations: [ViewlettersComponent]
})

export class ViewlettersModule { }
