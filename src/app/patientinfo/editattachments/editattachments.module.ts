import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditattachmentsComponent } from './editattachments.component';
// import { SidelinksModule } from '../sidelinks/sidelinks.module';
import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import {SidelinksModule } from '../sidelinks/sidelinks.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: EditattachmentsComponent
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule,
    SidelinksModule,
     CommonModule, RouterModule.forChild(routes)],
  declarations: [EditattachmentsComponent]
})

export class  EditattachmentsModule { }
