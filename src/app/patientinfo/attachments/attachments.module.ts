import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AttachmentsComponent } from './attachments.component';
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
    component: AttachmentsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,
    SidelinksModule,
     RouterModule.forChild(routes)],
  declarations: [AttachmentsComponent]
})

export class AttachmentsModule { }
